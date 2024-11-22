import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CounterPage = () => {

    const [countInput, setCountInput] = useState(0)

    const counterSelector = useSelector((state) => state.counter)

    const dispatch = useDispatch()

    const increment = () => {
        dispatch({type: "INCREMENT"})
    }

    const decrement = () => {
        dispatch({type: "DECREMENT"})
    }

    const InputCounter = () => {
        dispatch({
            type: "INPUT_COUNTER", payload: countInput
        })
    }
  return (
    <main className='min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8 flex flex-col justify-center items-center gap-4'>
        <p className='text-5xl font-bold'>Count: {counterSelector.count}</p>
        <div className='flex items-center gap-4'>
            <Button size='icon' onClick={decrement}>
                <Minus className='w-6 h-6'/>
            </Button>
            <Button size='icon' onClick={increment}>
                <Plus className='w-6 h-6'/>
            </Button>
        </div>

        <div className='flex gap-2 mt-8'>
            <Input type='number' onChange={(e) => setCountInput(e.target.value)} />
            <Button onClick={InputCounter}>Submit</Button>
        </div>
    </main>
  )
}

export default CounterPage