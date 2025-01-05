import { useState } from 'react'
import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'



function Simulator() {
  const [axValue, setAxValue] = useState(0);
  const [bxValue, setBxValue] = useState(0);
  const [cxValue, setCxValue] = useState(0);
  const [dxValue, setDxValue] = useState(0);
  const [register1SelectValue, setRegister1SelectValue] = useState("AX");
  const [register2SelectValue, setRegister2SelectValue] = useState("AX");
  const [tempMovValue, setTempMovValue] = useState(0);
  const [xchgRegister1SelectValue, setXchgRegister1SelectValue] = useState("AX");
  const [xchgRegister2SelectValue, setXchgRegister2SelectValue] = useState("AX");
  //const [bxValue, setbxValue] = useState(0);
  const [adressBpValue, setAdressBpValue] = useState(0);
  const [addressDiValue, setAddressDiValue] = useState(0);
  const [addressSiValue, setAddressSiValue] = useState(0);
  const [addressOffsetValue, setAddressOffsetValue] = useState(0);
  const [addressValue, setAddressValue] = useState(0);
  const [addressingType, setAddressingType] = useState("Bazowe");
  const [showBaseSlider, setShowBaseSlider] = useState(true)
  const [showIndexSlider, setShowIndexSlider] = useState(false)
  const [indexType, setIndexType] = useState("SI")
  const [baseType, setBaseType] = useState("BX")
  const [stack, setStack] = useState([]);
  const [pushRegisterSelectValue, setPushRegisterSelectValue] = useState("AX");
  const [popRegisterSelectValue, setPopRegisterSelectValue] = useState("AX");
  const [memoryMovRegister1SelectValue, setMemoryMovRegister1SelectValue] = useState("AX");
  const [memoryMovRegister2SelectValue, setMemoryMovRegister2SelectValue] = useState("AX");
  const [memoryXchgRegisterSelectValue, setMemoryXchgRegisterSelectValue] = useState("AX");



  const memoryArray = [
    {register: 0, value: 0}
  ];

  const [memory, setMemory] = useState(memoryArray);

  function handleRegChange(e) {
    const regex = /^[0-9A-Fa-f]{1,4}$/;
    
    if(regex.test(e.target.value)){
      e.target.value = e.target.value.toUpperCase();
    }
    else {
      e.target.value = e.target.value.slice(0, -1);
    }
    
  };

 

  function handleSetRegister(e)  {
    const index = e.target.value;
    let value = parseInt(document.getElementById(index).value, 16);
    switch (index) {
      case "AxNew": {
        if(isNaN(value)){
          value = 0;
        }
        setAxValue(value);
        break;
      }
      case "BxNew": {
        if(isNaN(value)){
          value = 0;
        }
        setBxValue(value);
        break;
      }
      case "CxNew": {
        if(isNaN(value)){
          value = 0;
        }
        setCxValue(value);
        break;
      }
      case "DxNew": {
        if(isNaN(value)){
          value = 0;
        }
        setDxValue(value);
        break;
      }

      default:
        break;
    }
  };

  function handleRegister1Select(e) {
    setRegister1SelectValue(e.target.value);
  };
  function handleRegister2Select(e){
    setRegister2SelectValue(e.target.value);
    switch (e.target.value) {
      case "AX": {
        setTempMovValue(axValue);
        break;
      }
      case "BX": {
        setTempMovValue(bxValue);
        break;
      }
      case "CX": {
        setTempMovValue(cxValue);
        break;
      }
      case "DX": {
        setTempMovValue(dxValue);
        break;
      }
      default:
        break;
    }
  };

  
  function handleMovSubmit(){
    switch (register1SelectValue) {
      case "AX": {
        setAxValue(tempMovValue);
        break;
      }
      case "BX": {
        setBxValue(tempMovValue);
        break;
      }
      case "CX": {
        setCxValue(tempMovValue);
        break;
      }
      case "DX": {
        setDxValue(tempMovValue);
        break;
      }
      default:
        break;
    }
  };

  function handleXchgRegister1Select(e) {
    setXchgRegister1SelectValue(e.target.value);
  };


  function handleXchgRegister2Select(e) {
    setXchgRegister2SelectValue(e.target.value);
  };

  function handleXchgSubmit(){
    let tempValue1;
    let tempValue2;


    switch(xchgRegister1SelectValue){
      case 'AX': {
        tempValue1 = axValue;
        break;
      }
      case 'BX': {
        tempValue1 = bxValue;
        break;
      }
      case 'CX': {
        tempValue1 = cxValue;
        break;
      }
      case 'DX': {
        tempValue1 = dxValue;
        break;
      }
    }
    switch(xchgRegister2SelectValue){
      case 'AX': {
        tempValue2 = axValue;
        setAxValue(tempValue1);
        break;
      }
      case 'BX': {
        tempValue2 = bxValue;
        setBxValue(tempValue1);
        break;
      }
      case 'CX': {
        tempValue2 = cxValue;
        setCxValue(tempValue1);
        break;
      }
      case 'DX': {
        tempValue2 = dxValue;
        setDxValue(tempValue1);
        break;
      }
    }

    switch(xchgRegister1SelectValue){
      case 'AX': {
        setAxValue(tempValue2);
        break;
      }
      case 'BX': {
        setBxValue(tempValue2);
        break;
      }
      case 'CX': {
        setCxValue(tempValue2);
        break;
      }
      case 'DX': {
        setDxValue(tempValue2);
        break;
      }
    }
    
  };

  function handleAddressBxChange(e){
    
    const regex = /^[0-9A-Fa-f]{1,4}$/;
    if(e.target.value === ""){
      setBxValue(0);
    }
    else {
      if(regex.test(e.target.value)){
        e.target.value = e.target.value.toUpperCase();
        setBxValue(parseInt(e.target.value, 16));
      }
      else {
        e.target.value = e.target.value.slice(0, -1);
      }
    }
    calculateAddress(e);
  }

  function handleAddressBpChange(e){
    const regex = /^[0-9A-Fa-f]{1,4}$/;
    if(e.target.value === ""){
      setAdressBpValue(0);
    }
    else {
      if(regex.test(e.target.value)){
        e.target.value = e.target.value.toUpperCase();
        setAdressBpValue(parseInt(e.target.value, 16));
      }
      else {
        e.target.value = e.target.value.slice(0, -1);
      }
    }
    calculateAddress(e);
  }

  function handleAddresDiChange(e){
    const regex = /^[0-9A-Fa-f]{1,4}$/;
    if(e.target.value === ""){
      setAddressDiValue(0);
    }
    else {
      if(regex.test(e.target.value)){
        e.target.value = e.target.value.toUpperCase();
        setAddressDiValue(parseInt(e.target.value, 16));
      }
      else {
        e.target.value = e.target.value.slice(0, -1);
      }
    }
    calculateAddress(e);
  }

  function handleAddresSiChange(e){
    const regex = /^[0-9A-Fa-f]{1,4}$/;
    if(e.target.value === ""){
      setAddressSiValue(0);
    }
    else {
      if(regex.test(e.target.value)){
        e.target.value = e.target.value.toUpperCase();
        setAddressSiValue(parseInt(e.target.value, 16));
      }
      else {
        e.target.value = e.target.value.slice(0, -1);
      }
    }
    calculateAddress(e);
  }

  function handleAddressOffsetChange(e){
    const regex = /^[0-9A-Fa-f]{1,4}$/;
    if(e.target.value === ""){
      setAddressOffsetValue(0);
    }
    else {
      if(regex.test(e.target.value)){
        e.target.value = e.target.value.toUpperCase();
        setAddressOffsetValue(parseInt(e.target.value, 16));
      }
      else {
        e.target.value = e.target.value.slice(0, -1);
      }
    }
    calculateAddress(e);
  }

  function handleAddressingTypeChange(e){
    if(e.target.value === "Indeksowe"){
      setShowIndexSlider(true);
      setShowBaseSlider(false);
    }
    else if(e.target.value === "Indeksowo-bazowe"){
      setShowIndexSlider(true);
      setShowBaseSlider(true);
    }
    else {
      setShowIndexSlider(false);
      setShowBaseSlider(true);
    }
    setAddressingType(e.target.value);
    calculateAddress(e);
  }

  function handleBaseTypeChange(e){
    setBaseType(e.target.value);
    calculateAddress(e);
  }

  function handleIndexTypeChange(e){

    setIndexType(e.target.value);
    calculateAddress(e);
  }

  


  function calculateAddress(e){
    let address = 0;
    if(e.target.value === ""){
      e.target.value = "0";
    }

    if(e.target.id === "addressing-offset-input"){
      
      setAddressOffsetValue(parseInt(e.target.value, 16));
      
    }

    switch(addressingType){
      case "Bazowe": {
        switch(baseType){
          case "BX": {
            
            if(e.target.id === "addressing-bx-input"){
              address += parseInt(e.target.value, 16);
            }
            else {
              address += bxValue;
            }
            break;
          }
          case "BP": {
            if(e.target.id === "addressing-bp-input"){
              address += parseInt(e.target.value, 16);
            }
            else {
              address += adressBpValue;
            }
            break;
          }
        }
        if(e.target.id === "addressing-offset-input"){
          address += parseInt(e.target.value, 16);
        }
        else {
          address += addressOffsetValue;
        }
        break;
      }
      case "Indeksowe": {
        switch(indexType){
          case "SI": {
            if(e.target.id === "addressing-si-input"){
              address += parseInt(e.target.value, 16);
            }
            else {
              address += addressSiValue;
            }
            break;
          }
          case "DI": {
            if(e.target.id === "addressing-di-input"){
              address += parseInt(e.target.value, 16);
            }
            else {
              address += addressDiValue;
            }
            break;
          }
        }
        if(e.target.id === "addressing-offset-input"){
          address += parseInt(e.target.value, 16);
        }
        else {
        address += addressOffsetValue;
        }
        break;
      }
      case "Indeksowo-bazowe": {
        switch(baseType){
          case "BX": {
            if(e.target.id === "addressing-bx-input"){
              address += parseInt(e.target.value, 16);
            }
            else {
              address += bxValue;
            }
            break;
          }
          case "BP": {
            if(e.target.id === "addressing-bp-input"){
              address += parseInt(e.target.value, 16);
            }
            else {
              address += adressBpValue;
            }
            break;
          }
        }
        switch(indexType){
          case "SI": {
            if(e.target.id === "addressing-si-input"){
              address += parseInt(e.target.value, 16);
            }
            else {
            address += addressSiValue;
            }
            break;
          }
          case "DI": {
            if(e.target.id === "addressing-di-input"){
              address += parseInt(e.target.value, 16);
            }
            else {
              address += addressDiValue;
            }
            break;
          }
        }
        if(e.target.id === "addressing-offset-input"){
          address += parseInt(e.target.value, 16);
        }
        else {
          address += addressOffsetValue;
        }
        break;
      }
    }
    if(isNaN(address)){
      address = 0;
    }
    
    setAddressValue(address);
  }

  function handleMemorySave(){
    
    
    let tempMemory;

    if(memory.find((element) => element.register === addressValue)){
      tempMemory = memory.map((element) => {
        if(element.register === addressValue){
          switch(memoryMovRegister1SelectValue){
            case "AX": {
              element.value = axValue;
              break;
            }
            case "BX": {
              element.value = bxValue;
              break;
            }
            case "CX": {
              element.value = cxValue;
              break;
            }
            case "DX": {
              element.value = dxValue;
              break;
            }
          }
        }
        return element;
      });
      setMemory(tempMemory);
      return;
    }
    
    switch(memoryMovRegister1SelectValue){
      case "AX": {
        tempMemory = [...memory, {register: addressValue, value: axValue}];
        break;
      }
      case "BX": {
        tempMemory = [...memory, {register: addressValue, value: bxValue}];
        break;
      }
      case "CX": {
        tempMemory = [...memory, {register: addressValue, value: cxValue}];
        break;
      }
      case "DX": {
        tempMemory = [...memory, {register: addressValue, value: dxValue}];
        break;
      }
    }

    //alert(tempMemory[tempMemory.length - 1].value);
    setMemory(tempMemory);
  }

  function handlePushRegisterSelect(e){
    setPushRegisterSelectValue(e.target.value);
    
  }

  function handlePopRegisterSelect(e){
    setPopRegisterSelectValue(e.target.value);
  }

  function handlePush(){
    let tempStack = [...stack, 0];
    switch(pushRegisterSelectValue){
      case "AX": {
        tempStack[tempStack.length - 1] = axValue;
        break;
      }
      case "BX": {
        tempStack[tempStack.length - 1] = bxValue;
        break;
      }
      case "CX": {
        tempStack[tempStack.length - 1] = cxValue;
        break;
      }
      case "DX": {
        tempStack[tempStack.length - 1] = dxValue;
        break;
      }
    }
    setStack(tempStack);
  }

  function handlePop(){
    let tempStack = [...stack];
    if(tempStack.length === 0){
      return;
    }
    let tempValue = tempStack[tempStack.length - 1];
    tempStack.pop();
    setStack(tempStack);
    switch(popRegisterSelectValue){
      case "AX": {
        setAxValue(tempValue);
        break;
      }
      case "BX": {
        setBxValue(tempValue);
        break;
      }
      case "CX": {
        setCxValue(tempValue);
        break;
      }
      case "DX": {
        setDxValue(tempValue);
        break;
      }
    }
  }

  function handleMemoryMovRegister1Select(e){
    setMemoryMovRegister1SelectValue(e.target.value);
  }

  function handleMemoryMovRegister2Select(e){
    setMemoryMovRegister2SelectValue(e.target.value);
  }

  function handleMemoryLoad(){
    let tempValue = memory.find((element) => element.register === addressValue);
    
    
    switch(memoryMovRegister2SelectValue){
      case "AX": {
        if(!tempValue){
          setAxValue(0);
          return;
        }
        setAxValue(tempValue.value);
        break;
      }
      case "BX": {
        if(!tempValue){
          setBxValue(0);
          return;
        }
        setBxValue(tempValue.value);
        break;
      }
      case "CX": {
        if(!tempValue){
          setCxValue(0);
          return;
        }
        setCxValue(tempValue.value);
        break;
      }
      case "DX": {
        if(!tempValue){
          setDxValue(0);
          return;
        }
        setDxValue(tempValue.value);
        break;
      }
    }
  }

  function handleMemoryXchgRegisterSelect(e){
    setMemoryXchgRegisterSelectValue(e.target.value);
  }

  function handleMemoryXchg(){
    const tempValue = memory.find((element) => element.register === addressValue);
    let tempMemory = [...memory];
    let tempRegisterValue;
    switch(memoryXchgRegisterSelectValue){
      case "AX": {
        tempRegisterValue = axValue;
        break;
      }
      case "BX": {
        tempRegisterValue = bxValue;
        break;
      }
      case "CX": {
        tempRegisterValue = cxValue;
        break;
      }
      case "DX": {
        tempRegisterValue = dxValue;
        break;
      }
    }
    switch(memoryXchgRegisterSelectValue){
      case "AX": {
        setAxValue(tempValue.value);
        break;
      }
      case "BX": {
        setBxValue(tempValue.value);
        break;
      }
      case "CX": {
        setCxValue(tempValue.value);
        break;
      }
      case "DX": {
        setDxValue(tempValue.value);
        break;
      }
    }
    tempMemory = tempMemory.map((element) => {
      if(element.register === addressValue){
        element.value = tempRegisterValue;
      }
      return element;
    });
    setMemory(tempMemory);
  }

  

  return (
    <>
      <h1 className='text-center'>Symulator procesora</h1>
      <h5 className='text-center'>zaprogramował Paweł Drabik</h5>
      <div className='box'>
        <div className='title-block'>Rejestry główne:</div>
        <div id="registers">
          <div id="Ax" className="register-block">
            <div id="AxLabel" className='label h5'>AX</div>
            <div id="AxState" className='state'>{axValue.toString(16).toUpperCase()}</div>
            <input type="text" id="AxNew" className='form-control' placeholder='0000' onChange={handleRegChange} />
            <button
              id="AxButton"
              className="set-button btn btn-primary"
              value="AxNew"
              onClick={handleSetRegister}
            >
              Zapisz
            </button>
          </div>
          <div id="Bx" className="register-block">
            <div id="BxLabel" className='label h5'>BX</div>
            <div id="BxState" className='state'>{bxValue.toString(16).toUpperCase()}</div>
            <input type="text" id="BxNew" className='form-control' placeholder='0000' onChange={handleRegChange} />
            <button
              id="BxButton"
              className="set-button btn btn-primary"
              value="BxNew"
              onClick={handleSetRegister}
            >
              Zapisz
            </button>
          </div>
          <div id="Cx" className="register-block">
            <div id="CxLabel" className='label h5'>CX</div>
            <div id="CxState" className='state'>{cxValue.toString(16).toUpperCase()}</div>
            <input type="text" id="CxNew" className='form-control' placeholder='0000' onChange={handleRegChange} />
            <button
              id="CxButton"
              className="set-button btn btn-primary"
              value="CxNew"
              onClick={handleSetRegister}
            >
              Zapisz
            </button>
          </div>
          <div id="Dx" className="register-block">
            <div id="DxLabel" className='label h5'>DX</div>
            <div id="DxState" className='state'>{dxValue.toString(16).toUpperCase()}</div>
            <input type="text" id="DxNew" className='form-control' placeholder='0000' onChange={handleRegChange} />
            <button
              id="DxButton"
              className="set-button btn btn-primary"
              value="DxNew"
              onClick={handleSetRegister}
            >
              Zapisz
            </button>
          </div>
        </div>
      </div>
      <div className='box'>
        <div className='title-block'>Instrukcje MOV i XCHG:</div>
        <div className='mov-xchg'>
            <div className="mov-instruction">
              <p className='inst-name'>MOV</p>
              <select
                value={register1SelectValue}
                onChange={handleRegister1Select}
                className='form-select'
              >
                <option value="AX">AX</option>
                <option value="BX">BX</option>
                <option value="CX">CX</option>
                <option value="DX">DX</option>
              </select>
              <p className='inst-name'> , </p>
              <select
                value={register2SelectValue}
                onChange={handleRegister2Select}
                className='form-select'
              >
                <option value="AX">AX</option>
                <option value="BX">BX</option>
                <option value="CX">CX</option>
                <option value="DX">DX</option>
              </select>
              <button onClick={handleMovSubmit} className='btn btn-secondary instruction'><FontAwesomeIcon icon={faPlay} /></button>
            </div>
            <div className="mov-instruction">
          <p className='inst-name'>XCHG</p>
            <select
              id="xchgRegister1Select"
              value={xchgRegister1SelectValue}
              onChange={handleXchgRegister1Select}
              className='form-select'
            >
              <option value="AX">AX</option>
              <option value="BX">BX</option>
              <option value="CX">CX</option>
              <option value="DX">DX</option>
            </select>
            <p className='inst-name'> , </p>
            <select
              id="xchgRegister2Select"
              value={xchgRegister2SelectValue}
              onChange={handleXchgRegister2Select}
              className='form-select'
            >
              <option value="AX">AX</option>
              <option value="BX">BX</option>
              <option value="CX">CX</option>
              <option value="DX">DX</option>
            </select>
            <button onClick={handleXchgSubmit} className=' btn btn-secondary instruction'><FontAwesomeIcon icon={faPlay} /></button>
            </div>
        </div>
      </div>
      <div className='box'>
        <div className='title-block'>Rejestry bazowe, indeksowe i przesunięcie:</div>
        <div id="addressing-registers">
          <div id="addressing-bx">
            <div id="addressing-bx-label" className='label h5'>BX</div>
            <div id="addressing-bx-value" className='state'>{bxValue.toString(16).toUpperCase()}</div>
            <input type="text" id="addressing-bx-input"  className='form-control' placeholder='0000' onChange={handleAddressBxChange} />
          </div>
          
          <div id="addressing-bp">
            <div id="addressing-bp-label" className='label h5'>BP</div>
            <div id="addressing-bp-value" className='state'>{adressBpValue.toString(16).toUpperCase()}</div>
            <input type="text" id="addressing-bp-input" className='form-control' placeholder='0000' onChange={handleAddressBpChange} />
          </div>

          <div id="addressing-di">
            <div id="addressing-di-label" className='label h5'>DI</div>
            <div id="addressing-di-value" className='state'>{addressDiValue.toString(16).toUpperCase()}</div>
            <input type="text" id="addressing-di-input" className='form-control' placeholder='0000' onChange={handleAddresDiChange} />
          </div>

          <div id="addressing-si">
            <div id="addressing-si-label" className='label h5'>SI</div>
            <div id="addressing-si-value" className='state'>{addressSiValue.toString(16).toUpperCase()}</div>
            <input type="text" id="addressing-si-input" className='form-control' placeholder='0000' onChange={handleAddresSiChange} />
          </div>

          <div id="addressing-offset">
            <div id="addressing-offset-label" className='label h5'>Offset</div>
            <div id="addressing-offset-value" className='state'>{addressOffsetValue.toString(16).toUpperCase()}</div>
            <input type="text" id="addressing-offset-input" className='form-control' placeholder='0000' onChange={handleAddressOffsetChange} />
          </div>
        </div>
      </div>
      <div className='box'>
        <div id="addressing-types">
          <div className='title-block'>Typ adresowania:</div>
          <div className='forms'>
            <select
              value={addressingType}
              onChange={handleAddressingTypeChange}
              className='form-select'
            >
              <option value="Bazowe">Bazowe</option>
              <option value="Indeksowe">Indeksowe</option>
              <option value="Indeksowo-bazowe">Indeksowo-bazowe</option>
            </select>
          </div>
          <div className='forms'>
            { showBaseSlider ? 
            <select
              value={baseType}
              onChange={handleBaseTypeChange}
              className='form-select'
            >
              <option value="BX">BX</option>
              <option value="BP">BP</option>
            </select>
            : null }
            { showIndexSlider ? 
            <select
              value={indexType}
              onChange={handleIndexTypeChange}
              className='form-select'
            >
              <option value="SI">SI</option>
              <option value="DI">DI</option>

            </select>
            : null }
          </div>
        </div>
        <div className='text-center memory'>
          <div className='row-justify-content-center memory-block'>
            <div className='col-3'>Adresowana komórka pamięci:</div> 
            <div className='col-1 stack-value'> #{addressValue.toString(16).toUpperCase()}</div>
          </div>
          <div className='row-justify-content-center memory-block'>
            <div className='col-3'>Wartość w rejestrze: </div>
            <div className='col-1 stack-value'>{
              (() => {
                const foundElement = memory.find((element) => element.register === addressValue);
                return foundElement ? foundElement.value.toString(16).toUpperCase() : 0;
              })()
            }</div>
          </div>
        </div>
      </div>
        <div className='text-center memory box'>
          <div className='title-block'>Instrukcje MOV i XCHG do pracy z pamięcią:</div>
          <div className='mov-xchg1'>
            <div className="mov-instruction">
              <p className='inst-name'>MOV </p>
              <p className='address-value'> #{addressValue.toString(16).toUpperCase()} , </p>
              <select
                value={memoryMovRegister1SelectValue}
                onChange={handleMemoryMovRegister1Select}
                className='form-select'
              >
                <option value="AX">AX</option>
                <option value="BX">BX</option>
                <option value="CX">CX</option>
                <option value="DX">DX</option>
              </select>
              <button onClick={handleMemorySave} className=' btn btn-secondary instruction'><FontAwesomeIcon icon={faPlay} /></button>
            </div>
            <div className="mov-instruction">
              <p className='inst-name'>MOV </p>
              <select
                value={memoryMovRegister2SelectValue}
                onChange={handleMemoryMovRegister2Select}
                className='form-select'
              >
                <option value="AX">AX</option>
                <option value="BX">BX</option>
                <option value="CX">CX</option>
                <option value="DX">DX</option>
              </select>
              <p className='address-value'> ,  #{addressValue.toString(16).toUpperCase()}</p>
              <button onClick={handleMemoryLoad} className=' btn btn-secondary instruction'><FontAwesomeIcon icon={faPlay} /></button>
            </div>
        
        
            <div className="mov-instruction">
              <p className='inst-name'>XCHG </p>
              <select
                value={memoryXchgRegisterSelectValue}
                onChange={handleMemoryXchgRegisterSelect}
                className='form-select'
              >
                <option value="AX">AX</option>
                <option value="BX">BX</option>
                <option value="CX">CX</option>
                <option value="DX">DX</option>
              </select>
              <p className='address-value'> ,  #{addressValue.toString(16).toUpperCase()}</p>
              <button onClick={handleMemoryXchg} className=' btn btn-secondary instruction'><FontAwesomeIcon icon={faPlay} /></button>
            </div>
          
          </div>
        </div>
      <div className='box'>
      <div className='title-block'>Instrukcje PUSH i POP:</div>
      <div className='mov-xchg'>
        <div className="mov-instruction">
          <p className='inst-name'>PUSH </p>
          <select
            value={pushRegisterSelectValue}
            onChange={handlePushRegisterSelect}
            className='form-select'
          >
            <option value="AX">AX</option>
            <option value="BX">BX</option>
            <option value="CX">CX</option>
            <option value="DX">DX</option>
          </select>
          <button onClick={handlePush} className=' btn btn-secondary instruction'><FontAwesomeIcon icon={faPlay} /></button>
        </div>
        <div className="mov-instruction">
          <p className='inst-name'>POP </p>
          <select
          value={popRegisterSelectValue}
          onChange={handlePopRegisterSelect}
          className='form-select'
        >
          <option value="AX">AX</option>
          <option value="BX">BX</option>
          <option value="CX">CX</option>
          <option value="DX">DX</option>
        </select>
          <button onClick={handlePop} className=' btn btn-secondary instruction'><FontAwesomeIcon icon={faPlay} /></button>
        </div>
      </div>
      <div className='row-justify-content-center memory-block'>
        <div className='col-3'><b>Ostatnia wartość na stosie:</b></div>
        <div className='col-1 stack-value'>
          {stack.map((element, index) => {
            return index === stack.length - 1 ? <div key={index}>{element.toString(16).toUpperCase()}</div> : null;
          })}
        </div>
      </div>
    </div>
      
    </>
  );
}

function App() {
  

  return (
    <>
      <Simulator />
    </>
  )
}

export default App
