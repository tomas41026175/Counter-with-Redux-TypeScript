import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { add, minus, ItemType } from '../store/slice/cartSlice'
import { RootState } from '../store/index'

type CounterProps = {
    tempData: ItemType;
    title: string;
}

function Counter({ tempData, title }: CounterProps) {
    const dispatch = useDispatch()
    const storeState = useSelector((state: RootState) => state.myCart);
    const [nowCount, setNowCount] = useState(0);
    console.log(storeState)

    useEffect(() => {
        const targetData = storeState.find((e) => e.tempData.id === tempData.tempData.id);
        const newCount = targetData ? targetData.tempData.count : 0;
        setNowCount(newCount);
    }, [tempData, storeState]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const dataAtt = e.currentTarget.getAttribute('data-btn');

        if (dataAtt === 'add') {
            dispatch(add(tempData));
        } else {
            dispatch(minus(tempData));
        }
    }

    return (
        <div className='flex flex-col justify-center items-center w-1/2 mx-auto gap-4'>
            <h2>{title}</h2>
            <div className='flex gap-8 items-center'>
                <button className='btn-style' onClick={handleClick} data-btn="minus">-</button>
                <div>{nowCount}</div>
                <button className='btn-style' onClick={handleClick} data-btn="add">+</button>
            </div>
        </div>
    )
}

export default Counter;
