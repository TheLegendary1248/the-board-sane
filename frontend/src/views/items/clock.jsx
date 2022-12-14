import React, { useRef, useEffect, useState } from 'react'
import ItemWrapper from 'views/components/itemWrapper'

export default function Clock() {
    import('../../styles/items/clock.css')
    return (
        <div className='item i_clock'>
            <div className='selection'>
                <span>Clock</span>
                <span>Timer</span>
                <span>Stopwatch</span>
            </div>
            <div className='counter'>
                <input className='hour' placeholder='00' maxLength={2}></input>
                :
                <input className='minute' placeholder='00' maxLength={2}></input>
                ;
                <input className='second' placeholder='00' maxLength={2}></input>
            </div>
            <div className="meter-gauge">
                <span style={{ width: "20%" }}></span>
            </div>
        </div>
    )
}