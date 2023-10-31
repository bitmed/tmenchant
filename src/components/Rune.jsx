import React from 'react';

function Rune(props) {
  if( !props.rune ) return (<></>);

  let optionLevels = [];
  let optionLevelsFrom = [];
  for( let i = 1; i <= 3 && i <= props.rune.level + props.availableLevels; i++ ) {
    if( i < 3  && i < props.rune.level + props.availableLevels ) optionLevelsFrom.push(<option>{i}</option>);
    optionLevels.push(<option>{i}</option>);
  }

  let cost = [];
  for(const k in props.cost) {
    if(props.cost[k])
      cost.push( <span className='cost-item'><span>{k}</span> <span>{props.cost[k]}</span></span> );
  }

  return (
    <div className='rune-row'>
      <div className='rune-data'>
        <div>
          <span>Runa</span>
          <select className='rune-name' value={props.rune.name} onChange={ev => props.changeRune(props.rune, ev.target.value)}>
          {props.availableRunes.map(item => <option key={item.label} value={item.label}>{item.label}</option>)}
          </select>
        </div>
        {props.rune.name !== '' && <div className='rune-level'>
          <span>Livello</span>
          <span>da</span>
          <select value={props.rune.from} onChange={ev => props.changeRuneFrom(props.rune, ev.target.value, props.rune.level)}>
            <option>0</option>
            {optionLevelsFrom}
          </select>
          <span>a</span>
          <select value={props.rune.level} onChange={ev => props.changeRuneLevel(props.rune, props.rune.from, ev.target.value)}>
            {optionLevels}
          </select>
          </div>
        }
      </div>
      <div className='rune-cost'>
        {props.rune.name !== '' && <div className='runeCost'>{cost}</div>}
      </div>
      <div className='rune-buttons'>
        <a onClick={ev => props.removeRune(props.rune)}>-</a>
      </div>
    </div>
  );
}

export default Rune;