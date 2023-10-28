import { useState } from 'react';
import './App.css';

function App() {

  const [time, setTime] = useState({H: 0, M: 0, S: 0, ms:0})
  const [status, setStatus] = useState(0);
  const [interv, setInterv] = useState();

  const start = () => {
    run();
    setInterv(setInterval(run, 10));
    setStatus(1);
  };

  var updatedH = time.H;
  var updatedM = time.M;
  var updatedS = time.S;
  var updated_ms = time.ms;

  const run = ()=>{
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updated_ms === 100){
      updatedS++;
      updated_ms = 0;
    }
    updated_ms++;
    return setTime({H: updatedH, M: updatedM, S: updatedS, ms: updated_ms})
  };

  const stop = ()=>{
    clearInterval(interv)
    setStatus(2);
  }
  const reset =()=> {
    setStatus(0);
    clearInterval(interv);
    setTime({H: 0, M: 0, S: 0, ms: 0});
  }
  const resume = () => start();

  return (
    <div className="container">
      <div className='heading'>Stop Watch</div>
      <div className='watch-box'>
        <div className='box'>{(time.H >=10)? time.H : "0"+time.H}</div>&nbsp; : &nbsp;
        <div className='box'>{(time.M >=10)? time.M : "0"+time.M}</div>&nbsp; : &nbsp;
        <div className='box'>{(time.S >=10)? time.S : "0"+time.S}</div>&nbsp; : &nbsp;
        <div className='box'>{(time.ms >=10)? time.ms : "0"+time.ms}</div>
      </div>
      <div>
        {(status === 0)?
          <button className='StartButton' onClick={start}>Start</button> : ""
        }
        {(status === 1)?
            <div>
              <button className='StopButton' onClick={stop}>Stop</button>
              <button className='ResetButton' onClick={reset}>Reset</button>
            </div> : ""
        }
        {(status === 2)?
          <div>
            <button className='ResumeButton' onClick={resume}>Resume</button>
            <button className='ResetButton' onClick={reset}>Reset</button>
          </div> : ""
      }
      </div>
    </div>
  );
}

export default App;
