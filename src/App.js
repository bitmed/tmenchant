import React, { useState } from 'react';
import Rune from './components/Rune';
import './App.css';
import { type } from '@testing-library/user-event/dist/type';

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
  { crystal: 'polveri', quantity: 5, core: 0, superiorCore: 0 },
  { crystal: 'frammenti', quantity: 3, core: 0, superiorCore: 0 },
  { crystal: 'frammenti', quantity: 5, core: 0, superiorCore: 0 },
  { crystal: 'cristalli', quantity: 2, core: 1, superiorCore: 0 },
  { crystal: 'cristalli', quantity: 4, core: 0, superiorCore: 1 },
];

const bloodMultipliers = {
  'polveri': 1,
  'frammenti': 2,
  'cristalli': 5
};

const minorRunes = [
  { label: '' },
  { label: 'Resistenza' },
  { label: 'Catena' },
];

function App() {
  const [runes, setRunes] = useState([]);
  const [minors, setMinors] = useState([]);

  const availableMajorRunes = (current) => {
    let type0 = false;
    let names = [];
    let currentType = majorRunes.find( item => item.label === current.name ).type;
    for( let i = 0; i < runes.length; i++) {
      if( majorRunes.find( item => item.label === runes[i].name ).type == 0 ) type0 = true;
      if( runes[i] !== current && runes[i].name !== '' ) names.push(runes[i].name);
    }

    return majorRunes.filter( item => (item.type != 0 || !type0 || currentType == 0 ) && names.indexOf(item.label) == -1 );
  }

  const availableMinorRunes = (current) => {
    let names = [];
    for( let i = 0; i < minors.length; i++) {
      if( minors[i] !== current && minors[i].name !== '' ) names.push(minors[i].name);
    }
    return minorRunes.filter( item => names.indexOf(item.label) == -1 );
  }

  const majorMaterialCost = (rune) => {
    if( rune.name === '') return {};

    let costs = { 'polveri': 0, 'frammenti': 0, 'cristalli': 0, 'Nucleo': 0, 'Nucleo Formidabile': 0 };
    let runeData = majorRunes.find(item => item.label === rune.name);

    for( let i = 0; i < rune.level; i++) {
      let cost = levelMultipliers[i];

      //if( costs.hasOwnProperty(cost.crystal) ) costs[cost.crystal] += cost.quantity;
      //else costs[cost.crystal] = cost.quantity;
      costs[cost.crystal] += cost.quantity * (runeData.blood.length > 0 ? runeData.blood.length : 1);

      if( cost.nucleus ) costs['Nucleo'] = 1;
      if( cost.superiorNucleus ) costs['Nucleo Formidabile'] = 1;

      runeData.blood.forEach( blood => {
        if( costs.hasOwnProperty(blood) ) costs[blood] += cost.quantity * bloodMultipliers[cost.crystal];
        else costs[blood] = cost.quantity * bloodMultipliers[cost.crystal];
      });
    }

    return costs;
  }

  const minorMaterialCost = (rune) => {
    if( rune.name === '') return {};
    let costs = { 'gold': 0 };
    for( let i = 1; i <= rune.level; i++ )
      costs['gold'] += i * 50000;
    return costs;
  }

  const updateRune = (rune, newName) => {
    updateRuneLevel(rune, newName === '' ? 1 : rune.level, newName);
  }

  const updateRuneLevel = (rune, value, name = false) => {
    let newList = [];
    let totalLevels = 0;
    value = parseInt(value);
    for(let i = 0; i < runes.length; i++) {
      if(runes[i] === rune) {
        runes[i].level = parseInt(value);
        if(name !== false) runes[i].name = name;
      }
      totalLevels += runes[i].name === '' ? 0 : runes[i].level;
    }
    for(let i = 0; i < runes.length; i++) {
      if(runes[i].name != '' || totalLevels < 10)
        newList.push(runes[i]);
    }
    setRunes(newList);
  }

  const updateMinorRune = (rune, newName) => {
    updateMinorRuneLevel(rune, newName === '' ? 1 : rune.level, newName);
  }

  const updateMinorRuneLevel = (rune, value, name = false) => {
    let newList = [...minors];
    for( let i = 0; i < newList.length; i++) {
      if( newList[i] === rune ) {
        newList[i].level = parseInt(value);
        if(name !== false) newList[i].name = name;
      }
    }
    setMinors(newList);
  }

  const addRune = () => {
    let newList = [...runes];
    newList.push({ name:'', level: 1 });
    setRunes(newList);
  }

  const removeRune = (rune) => {
    let newList = [];
    for(let i = 0; i < runes.length; i++) {
      if(runes[i] !== rune) {
        newList.push(runes[i]);
      }
    }
    setRunes(newList);
  }

  const addMinorRune = () => {
    let newList = [...minors];
    newList.push({ name: '', level: 1 });
    setMinors(newList);
  }

  const removeMinorRune = (rune) => {
    let newList = [];
    for(let i = 0; i < minors.length; i++) {
      if(minors[i] !== rune) {
        newList.push(minors[i]);
      }
    }
    setMinors(newList);
  }

  let availableLevels = 10;
  for( let i = 0; i < runes.length; i++)
    availableLevels -= runes[i].name != '' ? runes[i].level : 0;

  let runesRendered = [];
  let totalCost = {};
  for( let i = 0; i < runes.length; i++) {
    let runeCost = majorMaterialCost(runes[i]);
    runesRendered.push(<Rune rune={runes[i]} availableLevels={availableLevels} removeRune={removeRune} availableRunes={availableMajorRunes(runes[i])} changeRune={updateRune} changeRuneLevel={updateRuneLevel} cost={runeCost} />);

    for( const k in runeCost ) {
      if( totalCost.hasOwnProperty(k) ) totalCost[k] += runeCost[k];
      else totalCost[k] = runeCost[k];
    }
  }

  let minorRunesRendered = [];
  for( let i = 0; i < minors.length; i++) {
    let runeCost = minorMaterialCost(minors[i]);
    minorRunesRendered.push(<Rune rune={minors[i]} availableLevels={9999} removeRune={removeRune} availableRunes={availableMinorRunes(minors[i])} changeRune={updateMinorRune} changeRuneLevel={updateMinorRuneLevel} cost={runeCost} />);

    for( const k in runeCost ) {
      if( totalCost.hasOwnProperty(k) ) totalCost[k] += runeCost[k];
      else totalCost[k] = runeCost[k];
    }
  }

  let totalCostRendered = [];
  for( const k in totalCost ) {
    if(totalCost[k])
      totalCostRendered.push(<><span>{k}</span><span>{totalCost[k]}</span></>);
  }

  return (
    <div className="App">
      <header className="app-header">
        Costo Incantamento
      </header>
      <div className='main-content'>
        <div className='major-runes'>
          <h2>Rune maggiori</h2>
          {runesRendered}
          {runes.length < 5 && availableLevels > 0 && <a onClick={addRune}>Aggiungi runa</a>}
        </div>
        <div className='minor-runes'>
          <h2>Rune minori</h2>
          {minorRunesRendered}
          {minors.length < minorRunes.length - 1 && <a onClick={addMinorRune}>Aggiungi runa</a>}
        </div>
        <div className='total-cost'>
          <h3>Costo totale</h3>
        {totalCostRendered}
        </div>
      </div>
    </div>
  );
}

export default App;
