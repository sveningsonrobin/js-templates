import React from 'react';
import style from './style.scss';

import { SomeComponent } from './components';

interface IProps {
    title: string;
}

export const DeadComponent = () => {
    return <div>Dead component that should be shaken off</div>;
};

export const MainComponent = ({ title }: IProps) => {
    return (
        <div className={style.mainComponent}>
            <h1>{title}</h1>
            Main component here! <SomeComponent />
        </div>
    );
};
