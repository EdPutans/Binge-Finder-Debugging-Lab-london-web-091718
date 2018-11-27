import React, { Component } from 'react';
import Episode from './Episode';


Array.prototype.unique = function () {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
}


class SelectedShowContainer extends Component {



  
  state = {
    selectedSeason: 1,
  }

  mapSeasons = () => {
    if (!!this.props.episodes){
      let seasons = this.props.episodes.map((e)=> e.season).unique()

      return seasons.map((s) => {
        return (<option value={s} key={s}>Season {s}</option>)
      });
    }
  }

  mapEpisodes = () => {
    return this.props.episodes.map((e)=>{
      if(parseInt(e.season) === parseInt(this.state.selectedSeason)){
        return (<Episode myEpisode={e} key={e.id}/>)
      }
    })
  }

  

  handleSelectionChange = (event) => {
    this.setState({ selectedSeason: event.target.value })
  }


  render() {
    const { selectedShow } = this.props

    return (
      <div style={{position: "static"}}>
        <h2>{selectedShow.name}</h2>
        <img src={selectedShow.image.medium} alt=""/>
        <p dangerouslySetInnerHTML={{__html: selectedShow.summary}}></p>
        <p>Premiered: {selectedShow.premiered}</p>
        <p>Status: {selectedShow.status}</p>
        <p>Average Rating: {selectedShow.rating.average}</p>
        <select style={{display: 'block'}} onChange={event=>this.handleSelectionChange(event)}>
          {this.mapSeasons()}
        </select>
        {this.mapEpisodes()}
      </div>
    );
  }

}


export default SelectedShowContainer;

