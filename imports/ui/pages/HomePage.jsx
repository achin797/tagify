import React, { Component } from 'react';
import TagsPanel from "../components/TagsPanel";
import { connect } from "react-redux";
import SongList from '../components/SongList';
import Layout from "antd/lib/layout";
import Navbar from "../components/Navbar";

class HomePage extends React.Component{

    hideTag = (songs) => {this.props.hideSongs(songs);}
    showTag = (songs) => {this.props.showSongs(songs);}
    addTag = (songInfo) => {this.props.addTag(songInfo);}


    render(){
        return(
            <div id="home-page"> 
            <Layout>
              <Navbar />
              <Layout>

                <TagsPanel tags={this.props.items} showTag={this.showTag} hideTag={this.hideTag}/>
                <SongList songs={Object.keys(this.props.display)} addTag={this.props.addTag}/>
                </Layout>
                </Layout>

            </div>
        )
    }
}

    const mapStateToProps = (state) => {
        return{
            items: state.home.items,
            display: state.home.display
        }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            hideSongs: (songs) => { dispatch({type: "HIDE", songs: songs})},
            showSongs: (songs) => { dispatch({type: "SHOW", songs: songs})},
            addTag: (songInfo) => { dispatch({type: "ADD", songInfo: songInfo})}
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
