

import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import './index.css';
import Loading from '../Loading';
import { PanelContext } from '../../../../context/PanelContext';


const InputBackInfo = ({limits, input, onFormClick }) => {

    const {loadingSamples,samples} = useContext(PanelContext)


    const { register, handleSubmit, watch, formState: { errors }, getValues, setValue } = useForm({
        defaultValues:{
            start: limits.minStart,
            end: limits.maxEnd,
            space: 6,
            period: "month"
        },
        mode: 'all'
        
    });

    const validateDates = () => {

        const setLimit = (value,date) => setValue(value, new Date(date).toISOString().split('T')[0])
        const {minStart, maxEnd} = limits
        const startValue = getValues("start")
        const endValue = getValues("end")
        if(startValue == endValue){
            setLimit('start',minStart)
            setLimit('end',maxEnd)
            return false
        }
        if(startValue < minStart || startValue > endValue){
            setLimit('start',minStart)
            return false
        }
        if(endValue > maxEnd || endValue < startValue){
            setLimit('end',maxEnd)
            return false
        }
        return true

    }

    const validateStart = (start) => {
        let minStartDate = new Date(limits.minStart)
        let startDate = new Date(start)
    
        const setLimit = () =>{
            setValue("start",minStartDate.toISOString().split('T')[0])
        }
        if(startDate.getTime() < minStartDate.getTime()){
            setLimit()
            return false
        }
        const startValue = getValues("start")
        const endValue = getValues("end")
        if(startValue == endValue){
            setLimit()
            return false
        }
        return true
    };
    const validateEnd = (end) => {
        let maxEndDate = new Date(limits.maxEnd)
        let endDate = new Date(end)

        const setLimit = () =>{
            setValue("end",maxEndDate.toISOString().split('T')[0])
        }
        if(endDate.getTime() > maxEndDate.getTime()){
            setLimit()
            return false
        }
        const startValue = getValues("start")
        const endValue = getValues("end")
        if(startValue == endValue){
            setLimit()
            return false
        }
        return true
    };


    const onSubmit = data => onFormClick(data)
    
    const getForm = () => {
        return (
            <>
                <form id="hook-form" className='form-back' onSubmit={handleSubmit(onSubmit)}>
                    <div className='input-container'>
                        <input className='back-input' {...register("start",{validate:{validateDates}})}  type={"date"} placeholder="Start" defaultValue={"2021-01-01"} name="start" />
                        <label className='back-label' name="start">START</label>
                    </div>
                    <div className='input-container'>
                        <input className='back-input' {...register("end",{validate:{validateDates}})}  type={"date"} defaultValue={"2022-01-01"} name="end" />
                        <label className='back-label' name="end">END</label>
                    </div>

                    <div className='input-container'>
                        <input className='back-input' min="1" {...register("space",{required:{
                            required: true,
                            max: 3
                        }})} type={"number"}  name="space" defaultValue={6} />
                        <label className='back-label'   name="space" >SPACE</label>
                    </div>
                    <div className='input-container'>
                        <select className='back-input' {...register("period")}  name="period">
                            <option value="day">Day</option>
                            <option selected value="month">Month</option>
                            <option value="year">Year</option>
                        </select>
                        <label className='back-label' name="period">PERIOD</label>
                    </div>
                </form>
                <button type="submit" form="hook-form" className='back-now'>BACK NOW</button>
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