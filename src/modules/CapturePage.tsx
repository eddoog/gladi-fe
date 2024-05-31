import React from 'react';
import { useRecordWebcam } from 'react-record-webcam';
import { useNavigate } from "react-router-dom";
import SwitchSelector from "react-switch-selector";
import { v4 as uuid } from 'uuid';

import { CameraButton } from '../components/common/CameraButton';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';

export function CapturePage() {
  const navigate = useNavigate();

  const {
    activeRecordings,
    cancelRecording,
    clearAllRecordings,
    clearPreview,
    createRecording,
    devicesById,
    devicesByType,
    openCamera,
    startRecording,
    stopRecording,
  } = useRecordWebcam();

  const [videoDeviceId, setVideoDeviceId] = React.useState<string>('');
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>('');
  const [recordedChunks, setRecordedChunks] = React.useState<Blob | undefined>(undefined);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const options = [
    {
      label: "EN",
      value: "english",
      selectedBackgroundColor: "#0097e6",
      innerHeight: 50
    },
    {
      label: "ID",
      value: "indonesia",
      selectedBackgroundColor: "#0097e6"
    }
  ];

  const initialSelectedIndex = options.findIndex(({ value }) => value === "bar");

  const handleSelect = async (event: any) => {
    const { deviceid: deviceId } =
      event.target.options[event.target.selectedIndex].dataset;
    if (devicesById?.[deviceId].type === "videoinput") {
      setVideoDeviceId(deviceId);
    }
    if (devicesById?.[deviceId].type === "audioinput") {
      setAudioDeviceId(deviceId);
    }
  };

  const start = async () => {
    const recording = await createRecording(videoDeviceId, audioDeviceId);
    if (recording) await openCamera(recording.id);
  };

  const stop  = async (id: string) => {
    const recorded = await stopRecording(id);
    if (recorded) {
      setRecordedChunks(recorded.blob);
      // console.log(recorded.blob);
    }
  };

  const send = async () => {
    // Upload the blob to a back-end
    const formVideo = new FormData();
    const formFile = new FormData();

    if (recordedChunks != null && selectedFile != null) {
        formVideo.append('file', recordedChunks);
        formVideo.append("name", uuid());

        formFile.append('file', selectedFile);
        formFile.append("name", uuid());
    } else {
        console.log("Error")
    }
    
    console.log(formVideo);
    console.log(formFile);

    // const response = await fetch('https://video-recording-service-73zeqjyhhq-et.a.run.app/api/video', {
    //     method: 'POST',
    //     body: formVideo,
    // });

    // const response = await fetch('https://video-recording-service-73zeqjyhhq-et.a.run.app/upload', {
    //     method: 'POST',
    //     body: formFile,
    // });
  };

  const onChange = (newValue: any) => {
    console.log(newValue);
  };

  const handleFileUpload = (event: any) => {
    setSelectedFile(event.target.files[0]);

    console.log("Upload");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='container mt-5'>
        <button
          onClick={handleBack}
          className="rounded-lg flex flex-row items-center gap-2 justify-center bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600 duration-200 transition-all ease-in-out px-4 py-2"
        >
          Back
        </button>
        <div className="float-start p-4" style={{maxWidth: "1000px", width: "70%"}}>
            <div className="space-y-2">
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
            <div className="pt-3">
                <CameraButton onClick={start}>Buka Kamera</CameraButton>
                <CameraButton onClick={() => clearAllRecordings()}>Hapus Rekaman</CameraButton>
            </div>
            <div className="grid grid-cols-custom gap-4 my-4">
                {activeRecordings.map((recording) => (
                <div className="bg-white rounded-lg px-4 py-4" key={recording.id}>
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
                        <CameraButton inverted onClick={() => stop(recording.id)}>
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
                            <CameraButton inverted onClick={() => clearPreview(recording.id)}>
                                Bersihkan Pratinjau
                            </CameraButton>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className="float-start p-4" style={{width: "25%"}}>
            <p>Tambahkan Konteks (File/Teks)</p>
            <input type="file" onChange={handleFileUpload} />
            <div className='m-4'></div>
            <p>Pilih Bahasa</p>
            <div style={{height: "50px"}}>
              <SwitchSelector
                onChange={onChange}
                options={options}
                initialSelectedIndex={initialSelectedIndex}
              />
            </div>
            <div className='m-4'></div>
            <Button loading={false} onClick={send}>
                <span>Submit</span>
            </Button>
        </div>
    </div>
  );
}
