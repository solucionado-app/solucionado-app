import React from 'react'
import { Button } from '../../ui/button'
import Spinner from '../../ui/spinner'

interface Props {
    isLoading: boolean
    text?: string
}

function Submitbutton({ isLoading, text }: Props) {
    return (
        <Button type="submit" className="flex gap-2 w-full" disabled={isLoading}>
            {isLoading && <Spinner className="w-5" />}  {isLoading ? 'Enviando...' : text ?? 'Siguiente'}
        </Button>
    )
}



export default Submitbutton
