import React, { useState, useEffect } from "react";
import icon_play＿counter from "../image/play.png";
import icon_cancle_counter from "../image/cancle.png";
import icon_tomato_counter from "../image/tomatobig.svg";
import icon_stop_counter from "../image/stop.png";

const Counter = (props) => {
  const { hanldeTimesrunStatus, timesUp, toast, taskAmount } = props;
  const [mins, setMins] = useState(25);
  const [timerStatus, setTimerStatus] = useState("idle");
  const [time, setTime] = useState(0);
  const [pauseTime, setaPauseTime] = useState(0);
  let timerId;

  //點擊播放鍵
  const handleClickStart = (min) => {
    const minutes = Number(min);
    if (minutes <= 0) {
      hanldeTimesrunStatus("idle");
      toast.info("Please enter a time greater than zero!", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "greater-than-zero",
        closeButton: false,
      });
      return;
    } else if (isNaN(minutes)) {
      hanldeTimesrunStatus("idle");
      toast.info("Please enter a valid value!", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "valid-value",
        closeButton: false,
      });
      return;
    } else if (minutes > 30) {
      hanldeTimesrunStatus("idle");
      toast.info("Please enter a time within 30 minutes!", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "30-minutes",
        closeButton: false,
      });
      return;
    } else if (taskAmount === 0) {
      hanldeTimesrunStatus("idle");
      toast.info("Everything is done!", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "todo-length",
        closeButton: false,
      });
      return;
    }
    setTimerStatus("start");
    hanldeTimesrunStatus("start");
  };

  //點擊取消鍵
  const handleStop = () => {
    setTimerStatus("idle");
    hanldeTimesrunStatus("idle");
    setaPauseTime(0);
    document.title = "Pomodor App";
  };

  //點擊暫停鍵
  const handleClickPause = () => {
    let minutes = Number(time.split(":")[0]);
    let seconds = Number(time.split(":")[1]);
    setaPauseTime((minutes * 60 + seconds) / 60);
    setTimerStatus("pause");
  };

  //渲染倒數時間
  const render = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    const formatTime = `${minutes}:${String(seconds).padStart(2, 0)}`;
    document.title = `remaining time: ${formatTime}`;
    setTime(formatTime);
  };

  //計算倒數時間
  const conter = (mins) => {
    render(mins * 60);
    const endTime = Date.now() + mins * 60 * 1000 + 1000;
    timerId = setInterval(() => {
      const remainingSeconds = Math.floor((endTime - Date.now()) / 1000);
      if (remainingSeconds < 0) {
        document.title = "Pomodor App";
        setaPauseTime(0);
        clearInterval(timerId);
        hanldeTimesrunStatus("over");
        toast.info("Time's up!", {
          position: toast.POSITION.TOP_CENTER,
          toastId: "Times-up",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
        });
        setTimerStatus("idle");
        return;
      }
      render(remainingSeconds);
    }, 1000);
  };

  //監聽時間狀態，將時間根據狀態計算
  useEffect(() => {
    if (timerStatus === "idle" || timerStatus === "pause") return;
    if (pauseTime) {
      conter(pauseTime);
    } else {
      conter(mins);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [timerStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  //監聽倒數狀態，讓todolist切換todo狀態
  useEffect(() => {
    if (timesUp !== "start") return;
    handleClickStart(mins);
  }, [timesUp]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="counter_container">
      <div className="timer">
        <img
          src={icon_tomato_counter}
          className="icon_tomato_counter"
          alt="counter background"
        />
        <div
          className="input_time_part"
          style={{ display: timerStatus === "idle" ? "block" : "none" }}
        >
          <input
            type="text"
            className="input_time_idle"
            placeholder="25"
            value={mins}
            onChange={(e) => setMins(e.target.value)}
          />
          mins
        </div>
        <div
          className="input_time_part"
          style={{
            display:
              timerStatus === "start" || timerStatus === "pause"
                ? "block"
                : "none",
          }}
        >
          <div className="input_time_start">{time}</div>
        </div>
      </div>
      <div className="counter_divider"></div>
      <div className="counter_footer">
        <button
          onClick={() => handleClickStart(mins)}
          className="start_button"
          style={{
            cursor: timerStatus === "start" ? "not-allowed" : "pointer",
            display: timerStatus !== "start" ? "flex" : "none",
          }}
        >
          <img
            src={icon_play＿counter}
            className="icon_play＿counter"
            alt="counter play button"
            style={{
              filter: timerStatus === "start" ? "grayscale(60%)" : null,
            }}
          />
        </button>
        <button
          onClick={() => handleClickPause()}
          className="stop_button"
          style={{
            cursor: timerStatus === "start" ? "pointer" : "not-allowed",
            display: timerStatus === "start" ? "flex" : "none",
          }}
        >
          <img
            src={icon_stop_counter}
            className="icon_stop_counter"
            alt="counter stop button"
          />
        </button>
        <button onClick={() => handleStop()} className="cancle_button">
          <img
            src={icon_cancle_counter}
            className="icon_cancle_counter"
            alt="counter cancle button"
          />
        </button>
      </div>
    </div>
  );
};

export default Counter;
