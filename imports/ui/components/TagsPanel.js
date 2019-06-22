import React, { Component } from 'react';
import Toggle from "./Toggle";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

const TagsPanel = ({tags, showTag, hideTag}) => {


    const getCurrTags = tags.map(tag => {
        return(
            <div key={tag.name} style={{ marginTop: 16 }}>
                <Col className="gutter-row" span={3} style={{ marginBottom: 16 }} >
                    <Toggle>
                        {({ on, toggle }) => (
                            <div>
                            { !on && <Button type="primary" size="large" onClick={() => {showTag(tag.songs); {toggle()};}}>{tag.name}</Button>}
                            { on && <Button type="default" size="large" onClick={() => {hideTag(tag.songs); {toggle()};}}>{tag.name}</Button>}
                            </div>
                        )} 
                    </Toggle> 
                </Col>
            </div>
        ) 
    })

    return(
        <div >
            <Row gutter={16} type="flex" justify="center" align="middle">
                <Col className="gutter-row" span={16}>

                {getCurrTags}
                </Col>
            </Row>
        </div>
    )

}   

export default TagsPanel;
