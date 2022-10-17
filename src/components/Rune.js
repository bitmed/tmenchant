import React, { useState } from 'react';

const majorRunes = [
  { label: '', type: 999, blood: [] },
  { label: 'Magico', type: 0, blood: [] },
  { label: 'Fuoco', type: 0, blood: ['incandescente'] },
  { label: 'Freddo', type: 0, blood: ['glaciale'] },
  { label: 'Energia', type: 0, blood: ['titanico'] },
  { label: 'Psionico', type: 0, blood: ['illithid'] },
  { label: 'Veleno', type: 0, blood: ['venefico'] },
  { label: 'Sacro', type: 0, blood: ['iridescente'] },
  { label: 'Male', type: 0, blood: ['demoniaco'] },
  { label: 'Danno', type: 1, blood: ['vigoroso'] },
  { label: 'Precisione', type: 1, blood: ['volatile'] },
  { label: 'Parassitico', type: 0, blood: ['corrotto'] },
  { label: 'Dispersione', type: 0, blood: ['etereo'] },
  { label: 'Canalizzante', type: 0, blood: ['incandescente', 'glaciale', 'titanico', 'etereo'] },
  { label: 'Sterminatore', type: 0, blood: ['vigoroso','volatile','stabile'] },
  { label: 'Scioglilingua', type: 1, blood: ['volatile'] },
  { label: 'Indissolubile', type: 1, blood: ['stabile'] },
];

const levelMultipliers = [
  { crystal: 'polveri', quantity: 5, nucleus: 0, superiorNucleus: 0 },
  { crystal: 'frammenti', quantity: 3, nucleus: 0, superiorNucleus: 0 },
  { crystal: 'frammenti', quantity: 5, nucleus: 0, superiorNucleus: 0 },
  { crystal: 'cristalli', quantity: 2, nucleus: 1, superiorNucleus: 0 },
  { crystal: 'cristalli', quantity: 4, nucleus: 0, superiorNucleus: 1 },
];

const bloodMultipliers = {
  'polveri': 1,
  'frammenti': 2,
  'cristalli': 5
};

function Rune(props) {
  if( !props.rune ) return (<></>);

  let optionLevels = [];
  let optionLevelsFrom = [];
  for( let i = 1; i <= 5 && i <= props.rune.level + props.availableLevels; i++ ) {
    if( i < 5  && i < props.rune.level + props.availableLevels ) optionLevelsFrom.push(<option>{i}</option>);
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