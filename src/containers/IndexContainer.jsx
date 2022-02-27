import React from 'react';
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom';
import { Button } from 'antd';
import './IndexContainerCss';

const WorkspaceContainer = Loadable({
    loader: () => import('./WorkspaceContainer'),
    loading: () => null
})

const IndexContainer = () => {

    const handle = () => {
        console.log(123);
    }

    return (
        <div className={'container'}>
            <div>This is Index!!!</div>
            <a href='#/first'>go first!</a>
            <Button onClick={handle}>点击</Button> 
            <Switch>
                <Route path="/index/workspace" exact component={WorkspaceContainer} />
            </Switch>
        </div>
    )
};

export default IndexContainer;