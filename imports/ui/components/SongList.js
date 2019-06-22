import React, { Component } from 'react'
import Form from "antd/lib/form";
import Animate from 'rc-animate';
import Button from "antd/lib/button";
import Popover from "antd/lib/popover";


const SongList = ({songs}) => {

    const ButtonGroup = Button.Group;

    const getCurrDisplay = songs.map(song => {
        return(
            <div key={Math.random()}>
                 <Animate transitionName="fade" transitionAppear>
                 <Popover content={<form> <input type="text"></input></form>}trigger="click">
                    <Button block size="large">
                        <div>
                            <span>{song}</span>
                        </div>                   
                    </Button>
                </Popover>
                </Animate>
            </div>
        ) 
    })

    return (
        <div>
            {getCurrDisplay}
        </div>
    )
}

export default SongList;
