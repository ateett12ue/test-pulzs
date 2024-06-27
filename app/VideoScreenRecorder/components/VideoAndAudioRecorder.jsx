"use client";
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import RecordRTC from "recordrtc";
import { useMyContext } from "../../../context/MyContext";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { fetchData } from "../../utils/axios";
const VideoAndAudioRecorder = forwardRef((props, ref) => {
  const {
    title,
    description,
    saveVideoAfterStopRecordingOrNot,
    onRecordingCompleteAndGettingVideoId,
    typeComment1,
    requestBody,
    videoId,
    selectWorkspace,
  } = props;
  console.log(`title:${title}`);
  console.log(`description:${description}`);
  console.log(`VideoId:${videoId}`);
  console.log("Requestbody from VideoAndAudioRecorder", requestBody);
  console.log(`typecomment1:${typeComment1}`);
  console.log("saveVideoAfterStopRecording", saveVideoAfterStopRecordingOrNot);
  useImperativeHandle(ref, () => ({
    startRecording,
    stopRecording,
    createVideoCameraComment,
  }));
  const videoElement = useRef(null);
  const recorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [shouldVideoVisible, setVideoVisible] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const { resultVideosrccontext, setResultVideosrccontext } = useMyContext();
  const [resultVideosrc, setResultVideosrc] = useState("hlo");
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const captureCamera = (callback) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((camera) => {
        callback(camera);
      })
      .catch((error) => {
        alert("Unable to capture your camera. Please check console logs.");
        console.error(error);
      });
  };

  const stopRecordingCallback = async () => {
    videoElement.current.src = videoElement.current.srcObject = null;
    videoElement.current.muted = false;
    videoElement.current.volume = 1;
    videoElement.current.src = URL.createObjectURL(
      recorderRef.current.getBlob()
    );
    const timestamp = new Date().toISOString().replace(/[^a-zA-Z0-9]/g, "_");
    const videoFileName = `recorded-video_${timestamp}.mp4`;
    const videoBlob = recorderRef.current.getBlob();
    const videoFile = new File([videoBlob], videoFileName, {
      type: "video/mp4",
    });
    setVideoFile(videoFile);
    console.log("videoFile is below from stop recording");

    console.log(videoFile);
    // try {
    //   const formData = new FormData();
    //   formData.append("file", videoFile);
    //   formData.append("title", title);
    //   formData.append("description", description);

    //   const response = await fetch("http://localhost:8080/api/uploadVideo", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const responseData = await response.json();
    //   console.log("Server Response:", responseData);

    //   if (responseData.success) {
    //     alert("Video uploaded successfully");
    //   } else {
    //     alert("Video upload failed");
    //   }
    // } catch (error) {
    //   console.error("Error uploading video:", error);
    //   alert("Error uploading video");
    // }
    if (saveVideoAfterStopRecordingOrNot) {
      setVideoVisible(false);
      try {
        const formData = new FormData();
        formData.append("file", videoFile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("userId", userId);
        formData.append("selectWorkspaceId", selectWorkspace?.workspace_id);

        const response = await fetch(
          // "http://localhost:8080/api/uploadVideo",
          "https://back-end-repo-p11-debugdragons-pulze.onrender.com/api/uploadVideo",
          // `http://localhost:8080/api/comments/createvideocomment/${videoId}`,
          {
            method: "POST",
            body: formData,
          }
        );

        // const response = await fetch(
        //   "http://localhost:8080/api/uploadVideo",
        //   // `http://localhost:8080/api/comments/createvideocomment/${videoId}`,
        //   {
        //     method: "POST",
        //     body: formData,
        //   }
        // );

        // const response = await fetchData({
        //   url: "/uploadVideo",
        //   method: "post",
        //   body: formData,
        // });
        if (response.ok) {
          const responseData = await response.json();
          const { result } = responseData;
          setResultVideosrccontext(
            `https://d1yt4919vxgwb5.cloudfront.net/${result.VideoUploadedToS3Details.Key}`
          );
          console.log("Server Response:", response);
          console.log("Server Response result:", result);
          console.log(
            "Server Response result,VideoId:",
            result.VideoUploadedtoVideoMySqlDetails.video_id
          );

          setResultVideosrc(
            `https://d1yt4919vxgwb5.cloudfront.net/${result.VideoUploadedToS3Details.Key}`
          );

          // console.log(` src:${resultVideosrccontext}`);
          // onRecordingComplete(resultVideosrc);

          // let state = {
          //   resultVideosrc:`https://d1yt4919vxgwb5.cloudfront.net/${result.key}`, // Set a default value
          // };

          console.log(resultVideosrc);
          if (responseData.success) {
            console.log(`src:${resultVideosrccontext}`);
            if (typeof onRecordingCompleteAndGettingVideoId === "function") {
              try {
                onRecordingCompleteAndGettingVideoId(
                  result.VideoUploadedtoVideoMySqlDetails.video_id
                );
              } catch (error) {
                console.error("Error doing the function:", error?.error);
              }
            } else {
              console.error(
                "onRecordingCompleteAndGettingVideoId is not a function"
              );
            }

            toast("Video uploaded successfully");
          } else {
            toast("Video upload failed");
          }
        } else {
          console.error(
            "Failed to upload video becuase of no response.ok is there:",
            response.statusText
          );
          toast.error("Video upload failed becuase of response");
        }
      } catch (error) {
        console.error("Error uploading video:", error?.error);
        alert("Error uploading video", error?.error);
      }
    }
    recorderRef.current.camera.stop();
    recorderRef.current.destroy();
    recorderRef.current = null;

    setPaused(false);
  };

  const createVideoCameraComment = async (parentCommentId = null) => {
    // console.log(requestBody);
    console.log("videoFile from create videoComment below");
    console.log(videoFile);
    const { userId, timeStamp, type } = requestBody;

    console.log(`userId:${userId}`);
    console.log(`timeStamp:${timeStamp}`);
    console.log(`type:${type}`);
    console.log(`parentId:${parentCommentId}`);
    console.log(
      `typecomment1 from inside createvideoComment function:${typeComment1}`
    );

    try {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("userId", userId);
      formData.append("timeStamp", timeStamp);
      // formData.append("parentCommentId", parentCommentId);
      if (parentCommentId !== null) {
        formData.append("parentCommentId", parentCommentId);
      }
      formData.append("typeComment", type);

      console.log(formData);
      // const response = await fetch(
      //   `http://localhost:8080/api/comments/createvideocomment/${videoId}`,
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );

      const response = await fetchData({
        url: `/comments/createvideocomment/${videoId}`,
        method: "post",
        body: formData,
      });

      // const responseData = await response.json();
      const { result, success } = response;
      setResultVideosrccontext(
        `https://d1yt4919vxgwb5.cloudfront.net/${result.VideoUploadedToS3Details.key}`
      );
      console.log("Server Response:", response);
      console.log("Server Response result:", result);
      setResultVideosrc(
        `https://d1yt4919vxgwb5.cloudfront.net/${result.VideoUploadedToS3Details.key}`
      );

      // console.log(` src:${resultVideosrccontext}`);
      // onRecordingComplete(resultVideosrc);

      // let state = {
      //   resultVideosrc:`https://d1yt4919vxgwb5.cloudfront.net/${result.key}`, // Set a default value
      // };

      console.log(resultVideosrc);
      if (responseData.success) {
        console.log(`src:${resultVideosrccontext}`);
        toast("Video uploaded successfully");
      } else {
        toast("Video upload failed");
      }
    } catch (error) {
      console.error("Error uploading video:", error?.error);
      // alert("Error uploading video from frontend");
    }
  };

  const startRecording = () => {
    if (!recording) {
      setVideoVisible(true);
      captureCamera((camera) => {
        videoElement.current.muted = true;
        videoElement.current.volume = 0;
        videoElement.current.srcObject = camera;

        const newRecorder = RecordRTC(camera, { type: "video" });
        newRecorder.startRecording();

        // release camera on stopRecording
        newRecorder.camera = camera;

        recorderRef.current = newRecorder;
        setRecording(true);
      });
    }
  };

  const stopRecording = () => {
    setRecording(false);
    if (recording) {
      recorderRef.current.stopRecording(stopRecordingCallback);
    }
  };

  const pauseRecording = () => {
    if (recording && !paused) {
      recorderRef.current.pauseRecording();
      setPaused(true);
    }
  };

  const resumeRecording = () => {
    if (recording && paused) {
      recorderRef.current.resumeRecording();
      setPaused(false);
    }
  };

  return (
    <div className=" flex flex-col justify-center w-full h-full">
      {/* <title>Video Recording | RecordRTC</title>
      <h1>Simple Video and Audio </h1>

      <br />

      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <button onClick={pauseRecording} disabled={!recording || paused}>
        Pause Recording
      </button>
      <button onClick={resumeRecording} disabled={!recording || !paused}>
        Resume Recording
      </button>

      <hr /> */}
      {videoElement && (
        <>
          <video
            ref={videoElement}
            className={`bg-gray-900 ${
              shouldVideoVisible ? "visible" : "hidden"
            }`}
            controls
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%" }}
          ></video>
          <div
            className={`min-h-[100px] ${
              shouldVideoVisible ? "hidden" : "visible"
            }`}
          ></div>
        </>
      )}
      {/* <footer style={{ marginTop: "20px" }}>
        <small id="send-message"></small>
      </footer>
      <script src="https://www.webrtc-experiment.com/common.js"></script> */}
    </div>
  );
});
const VideoScreen = ({
  playerRef,
  onRecordingComplete,
  title,
  description,
  saveVideoAfterStopRecordingOrNot,
  onRecordingCompleteAndGettingVideoId,
  requestBody,
  typeComment1,
  videoId,
  selectWorkspace,
}) => {
  const handleRecordingComplete = (data) => {
    setRecordedVideoLink(data);
  };
  return (
    <VideoAndAudioRecorder
      ref={playerRef}
      title={title}
      description={description}
      saveVideoAfterStopRecordingOrNot={saveVideoAfterStopRecordingOrNot}
      onRecordingCompleteAndGettingVideoId={
        onRecordingCompleteAndGettingVideoId
      }
      requestBody={requestBody}
      typeComment1={typeComment1}
      videoId={videoId}
      selectWorkspace={selectWorkspace}
    />
  );
};
export default VideoScreen;
