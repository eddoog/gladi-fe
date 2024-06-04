import 'react-notifications-component/dist/theme.css';
import { RootState, useAppSelector } from '../redux/store';
import React from 'react';
import { useRecordWebcam } from 'react-record-webcam';
import { useNavigate } from 'react-router-dom';
import SwitchSelector from 'react-switch-selector';
import { v4 as uuid } from 'uuid';
import { ReactNotifications, Store } from 'react-notifications-component';

import { CameraButton } from '../components/common/CameraButton';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { useGetUserInfoQuery } from '../redux/api/authAPi';

export function CapturePage() {
  const navigate = useNavigate();
  const user_token = useAppSelector((state: RootState) => state.user).token;

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
    stopRecording
  } = useRecordWebcam({
    mediaTrackConstraints: { width: 640, height: 360, aspectRatio: 0.5 }
  });

  const { data: user } = useGetUserInfoQuery();

  const [videoDeviceId, setVideoDeviceId] = React.useState<string>('');
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>('');
  const [languange, setlanguange] = React.useState<string>('en');
  const [recordedChunks, setRecordedChunks] = React.useState<Blob | undefined>(
    undefined
  );
  const [selectedFile, setSelectedFile] = React.useState(null);

  const options = [
    {
      label: 'EN',
      value: 'en',
      selectedBackgroundColor: '#0097e6',
      innerHeight: 50
    },
    {
      label: 'ID',
      value: 'id',
      selectedBackgroundColor: '#0097e6'
    }
  ];

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === 'bar'
  );

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

  const start = async () => {
    const recording = await createRecording(videoDeviceId, audioDeviceId);
    if (recording) await openCamera(recording.id);
  };

  const record = async (id: string) => {
    await startRecording(id);
    await new Promise((resolve) => setTimeout(resolve, 900000)); // Set for 15 minutes
    stop(id);
  };

  const stop = async (id: string) => {
    const recorded = await stopRecording(id);
    if (recorded) {
      setRecordedChunks(recorded.blob);
      // console.log(recorded.blob);
    }
  };

  const send = async () => {
    // Upload the blob to a back-end
    const formData = new FormData();

    if (
      recordedChunks != undefined &&
      selectedFile != null &&
      user &&
      user_token != null
    ) {
      formData.append('video', recordedChunks);
      formData.append('file', selectedFile);
      formData.append('name', uuid());
      formData.append('user_id', user.id);
      formData.append('lang', languange);

      fetch(
        'https://video-recording-service-73zeqjyhhq-et.a.run.app/upload-file',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${user_token}`
          }
        }
      )
        .then(async (response) => {
          const data = await response.json();
          notification(
            'Upload Success!',
            'success',
            `Your request is being processing with ID: ${data.task_id}`
          );
        })
        .catch((_) => {
          notification('Upload Failed!', 'danger', null);
        });
    } else {
      notification('Incomplete Data!', 'danger', null);
    }

    // console.log(formData);
  };

  const onChange = (newValue: any) => {
    setlanguange(newValue);
    // console.log(newValue);
  };

  const handleFileUpload = (event: any) => {
    setSelectedFile(event.target.files[0]);

    // console.log("Upload");
  };

  const handleBack = () => {
    navigate('/');
  };

  const notification = (title: string, type: any, message: any) => {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: 'top',
      container: 'top-center',
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  };

  return (
    <div className="container mt-5">
      <ReactNotifications />
      <button
        onClick={handleBack}
        className="flex flex-row items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600"
      >
        Back
      </button>
      <div
        className="float-start p-4"
        style={{ maxWidth: '1000px', width: '70%' }}
      >
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
          <CameraButton onClick={() => clearAllRecordings()}>
            Hapus Rekaman
          </CameraButton>
        </div>
        <div className="grid-cols-custom my-4 grid gap-4">
          {activeRecordings.map((recording) => (
            <div className="rounded-lg bg-white px-4 py-4" key={recording.id}>
              <video
                ref={recording.webcamRef}
                loop
                autoPlay
                playsInline
                muted
              />
              <div className="my-2 space-x-1 space-y-1">
                <CameraButton
                  inverted
                  disabled={
                    recording.status === 'RECORDING' ||
                    recording.status === 'PAUSED'
                  }
                  onClick={() => record(recording.id)}
                >
                  Rekam
                </CameraButton>
                <CameraButton inverted onClick={() => stop(recording.id)}>
                  Berhenti
                </CameraButton>
                <CameraButton
                  inverted
                  onClick={() => cancelRecording(recording.id)}
                >
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
                <div className="my-2 space-x-2">
                  <CameraButton
                    inverted
                    onClick={() => clearPreview(recording.id)}
                  >
                    Bersihkan Pratinjau
                  </CameraButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="float-start p-4" style={{ width: '25%' }}>
        <p>Tambahkan Konteks (File/Teks)</p>
        <input type="file" onChange={handleFileUpload} />
        <div className="m-4"></div>
        <p>Pilih Bahasa</p>
        <div style={{ height: '50px' }}>
          <SwitchSelector
            onChange={onChange}
            options={options}
            initialSelectedIndex={initialSelectedIndex}
          />
        </div>
        <div className="m-4"></div>
        <Button loading={false} onClick={send}>
          <span>Submit</span>
        </Button>
      </div>
    </div>
  );
}
