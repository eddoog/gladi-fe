import React from 'react';
import { useRecordWebcam } from 'react-record-webcam';
import { CameraButton } from '../components/common/CameraButton';
import { Select } from '../components/common/Select';

export function CapturePage() {
  const {
    activeRecordings,
    cancelRecording,
    clearAllRecordings,
    clearError,
    clearPreview,
    closeCamera,
    createRecording,
    devicesById,
    devicesByType,
    download,
    errorMessage,
    muteRecording,
    openCamera,
    pauseRecording,
    resumeRecording,
    startRecording,
    stopRecording,
  } = useRecordWebcam();

  const [videoDeviceId, setVideoDeviceId] = React.useState<string>('');
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>('');

  const handleSelect = async (event: any) => {
    const { deviceid: deviceId } =
      event.target.options[event.target.selectedIndex].dataset;
    if (devicesById?.[deviceId].type === 'videoinput') {
      setVideoDeviceId(deviceId);
    }
    if (devicesById?.[deviceId].type === 'audioinput') {
      setAudioDeviceId(deviceId);
    }
  };

  const quickDemo = async () => {
    try {
      const recording = await createRecording();
      if (!recording) return;
      await openCamera(recording.id);
      await startRecording(recording.id);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await stopRecording(recording.id);
      await closeCamera(recording.id);
    } catch (error) {
      console.log({ error });
    }
  };

  const start = async () => {
    const recording = await createRecording(videoDeviceId, audioDeviceId);
    if (recording) await openCamera(recording.id);
  };

  return (
    <div className='container'>
        <div className="mx-auto p-4" style={{maxWidth: "1000px", width: "70%"}}>
            <div className="space-y-2 my-4">
                <div className="flex">
                <h4>Select video input</h4>
                <Select
                    items={devicesByType?.video || []}
                    dataset="deviceid"
                    onChange={handleSelect}
                />
                </div>
                <div className="flex">
                <h4>Select audio input</h4>
                <Select
                    items={devicesByType?.audio || []}
                    dataset="deviceid"
                    onChange={handleSelect}
                />
                </div>
            </div>
            <div className="space-x-2">
                <CameraButton onClick={quickDemo}>Tes Perekaman</CameraButton>
                <CameraButton onClick={start}>Buka Kamera</CameraButton>
                <CameraButton onClick={() => clearAllRecordings()}>Hapus Rekaman</CameraButton>
                <CameraButton onClick={() => clearError()}>Hapus Log Eror</CameraButton>
            </div>
            <div className="my-2">
                <p>{errorMessage ? `Error: ${errorMessage}` : ''}</p>
            </div>
            <div className="grid grid-cols-custom gap-4 my-4">
                {activeRecordings?.map((recording) => (
                <div className="bg-white rounded-lg px-4 py-4" key={recording.id}>
                    <div className="text-black grid grid-cols-1">
                    <p>Live</p>
                    <small>Status: {recording.status}</small>
                    <small>Video: {recording.videoLabel}</small>
                    <small>Audio: {recording.audioLabel}</small>
                    </div>
                    <video ref={recording.webcamRef} loop autoPlay playsInline />
                    <div className="space-x-1 space-y-1 my-2">
                    <CameraButton
                        inverted
                        disabled={
                        recording.status === 'RECORDING' ||
                        recording.status === 'PAUSED'
                        }
                        onClick={() => startRecording(recording.id)}
                    >
                        Rekam
                    </CameraButton>
                    <CameraButton
                        inverted
                        disabled={
                        recording.status !== 'RECORDING' &&
                        recording.status !== 'PAUSED'
                        }
                        toggled={recording.status === 'PAUSED'}
                        onClick={() =>
                        recording.status === 'PAUSED'
                            ? resumeRecording(recording.id)
                            : pauseRecording(recording.id)
                        }
                    >
                        {recording.status === 'PAUSED' ? 'Lanjut' : 'Jeda'}
                    </CameraButton>
                    <CameraButton
                        inverted
                        toggled={recording.isMuted}
                        onClick={() => muteRecording(recording.id)}
                    >
                        Mic
                    </CameraButton>
                    <CameraButton inverted onClick={() => stopRecording(recording.id)}>
                        Berhenti
                    </CameraButton>
                    <CameraButton inverted onClick={() => cancelRecording(recording.id)}>
                        Batal
                    </CameraButton>
                    </div>

                    <div
                    className={`${
                        recording.previewRef.current?.src.startsWith('blob:')
                        ? 'visible'
                        : 'hidden'
                    }`}
                    >
                    <p>Pratinjau</p>
                    <video ref={recording.previewRef} autoPlay loop playsInline />
                    <div className="space-x-2 my-2">
                        <CameraButton inverted onClick={() => download(recording.id)}>
                        Unduh
                        </CameraButton>
                        <CameraButton inverted onClick={() => clearPreview(recording.id)}>
                        Bersihkan Pratinjau
                        </CameraButton>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
}
