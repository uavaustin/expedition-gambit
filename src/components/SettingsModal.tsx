import React, { useState } from 'react';
import { Button } from 'semantic-ui-react'
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/yaml/yaml';
import yaml from 'js-yaml';
import CONFIG, { updateConfig } from '../config';

const SettingsModal = ({ visable, setVisable }: any) => {
  let [options, setOptions] = useState([false, {}]);
  let [valid, config] = options;
  let updateText = (text: string) => {
    let parsed;
    try {
      parsed = yaml.safeLoad(text);
      setOptions([true, parsed]);
    } catch (err) {
      setOptions([false, {}]);
    }
  };
  let doSave = () => {
    if (valid) {
      updateConfig(config);
    }
  };
  if (visable) {
    return <div className="settings-modal">
      <CodeMirror
        onChange={(val) => updateText(val)}
        options={{ mode: 'yaml' }}
        autoFocus={false}
        defaultValue={yaml.safeDump(CONFIG)} />
      <Button
        onClick={() => doSave()}
        compact
        color={valid ? 'green' : 'grey'}
        size='small'
        floated='right'>
        Save
            </Button>
      <Button
        onClick={() => setVisable(false)}
        compact
        size='small'
        floated='right'>
        Cancel
            </Button>
    </div>;
  }
  return null;
};

export default SettingsModal;