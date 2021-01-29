import React from 'react'
import styles from '../styles/404.module.css'
import {Typography} from '@material-ui/core'

export const FourOFour = () => {
    return (
        <div className={styles.error}>
            <div className={styles.container}>
                <Typography variant="h6">This page could not be found 🙁</Typography>
            </div>
        </div>
    )
}

export default FourOFour
