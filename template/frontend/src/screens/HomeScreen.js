import React from 'react';
import Axis from '../components/Axis';
import Canara from '../components/Canara';
import Icici from '../components/Icici';
import Sbi from '../components/Sbi';
import Hdfc from '../components/Hdfc';

export default function HomeScreen() {
  return (
    <div className="row center">
      <Hdfc />
      <Sbi />
      <Axis />
      <Canara />
      <Icici />
    </div>
  )
}
