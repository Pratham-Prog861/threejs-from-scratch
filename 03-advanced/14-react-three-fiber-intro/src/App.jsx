import { useState } from 'react';
import ComparisonView from './components/ComparisonView';
import Example1_Basic from './examples/Example1_Basic';
import Example2_Animation from './examples/Example2_Animation';
import Example3_Interaction from './examples/Example3_Interaction';
import Example4_State from './examples/Example4_State';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('comparison');

  return (
    <>
      <div className="info">
        <strong>React Three Fiber Introduction</strong><br /><br />
        <strong>What is R3F?</strong><br />
        A React renderer for Three.js<br />
        Declarative, component-based 3D<br /><br />
        <strong>Benefits:</strong><br />
        • Less boilerplate code<br />
        • React component model<br />
        • Automatic memory management<br />
        • State integration<br />
        • Hooks (useFrame, useThree)<br />
        • JSX for 3D scenes<br /><br />
        Switch tabs to see examples
      </div>

      <nav className="tabs">
        <button 
          className={activeTab === 'comparison' ? 'active' : ''}
          onClick={() => setActiveTab('comparison')}
        >
          Vanilla vs R3F
        </button>
        <button 
          className={activeTab === 'basic' ? 'active' : ''}
          onClick={() => setActiveTab('basic')}
        >
          1. Basic Scene
        </button>
        <button 
          className={activeTab === 'animation' ? 'active' : ''}
          onClick={() => setActiveTab('animation')}
        >
          2. Animation
        </button>
        <button 
          className={activeTab === 'interaction' ? 'active' : ''}
          onClick={() => setActiveTab('interaction')}
        >
          3. Interaction
        </button>
        <button 
          className={activeTab === 'state' ? 'active' : ''}
          onClick={() => setActiveTab('state')}
        >
          4. React State
        </button>
      </nav>

      {activeTab === 'comparison' && <ComparisonView />}
      {activeTab === 'basic' && <Example1_Basic />}
      {activeTab === 'animation' && <Example2_Animation />}
      {activeTab === 'interaction' && <Example3_Interaction />}
      {activeTab === 'state' && <Example4_State />}
    </>
  );
}

export default App;
