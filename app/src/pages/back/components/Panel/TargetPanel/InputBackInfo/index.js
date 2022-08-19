

import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../../hooks/useForm"
import './index.css';
import Loading from '../Loading';
import { PanelContext } from '../../../../context/PanelContext';


const InputBackInfo = ({ input, onFormClick }) => {

    const [form, getInputs] = useForm()
    const {loadingSamples,samples} = useContext(PanelContext)

    const onClick = () => {
        const inputs = getInputs()
        onFormClick(inputs)
    }
    const validateForm = (form) => {

    }
    const getForm = () => {
        return (
            <>
                <form className='form-back' ref={form}>
                    <div className='input-container'>
                        <input className='back-input' onChange={validateForm} type={"date"} placeholder="Start" defaultValue={"2022-01-01"} name="start" />
                        <label className='back-label' name="start">START</label>
                    </div>
                    <div className='input-container'>
                        <input className='back-input' onChange={validateForm} type={"date"} defaultValue={"2022-01-01"} name="end" />
                        <label className='back-label' name="end">END</label>
                    </div>

                    <div className='input-container'>
                        <input className='back-input' type={"number"} name="space" defaultValue={6} />
                        <label className='back-label' name="space">SPACE</label>
                    </div>
                    <div className='input-container'>
                        <select className='back-input' name="period">
                            <option value="day">Day</option>
                            <option selected value="month">Month</option>
                            <option value="year">Year</option>
                        </select>
                        <label className='back-label' name="period">PERIOD</label>
                    </div>
                </form>
                <button onClick={onClick} className='back-now'>BACK NOW</button>
            </>
        )
    }
    return (
        <div className='back-selector'>
            {loadingSamples ? <Loading message={"Loading samples"}/> : getForm()}
        </div>

    )

}

export default InputBackInfo