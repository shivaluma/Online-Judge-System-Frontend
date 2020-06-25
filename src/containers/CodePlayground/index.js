import React, { useState } from 'react';
import Header from '../../components/UI/Header';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import axios from 'axios';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');

require('codemirror/addon/display/autorefresh');
require('codemirror/mode/go/go');
require('codemirror/addon/edit/matchbrackets');

require('codemirror/mode/clike/clike');
require('codemirror/keymap/sublime');

require('codemirror/addon/edit/closebrackets');

export default () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);

  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  const sendCode = async () => {
    const response = await axios.post(
      'https://judgeonline.df.r.appspot.com/api/playground/run',
      {
        source_code: utf8_to_b64(code),
        language_id: 54,
      }
    );
    console.log(response);
    setResult(response.data.response);
  };

  return (
    <>
      <Header />
      <CodeMirror
        options={{
          theme: 'monokai',
          lineNumbers: true,
          autoRefresh: true,
          mode: 'text/x-c++src',
          matchBrackets: true,
          smartIndent: true,
          autoCloseBrackets: true,
        }}
        onChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <p>Test</p>
      <div className='h-32 w-48 border border-gray-500' contentEditable></div>
      <button onClick={sendCode}>SEND</button>

      {result ? (
        <div>
          <li>stdout: {result.stdout && b64_to_utf8(result.stdout)}</li>
          <li>time: {result.time}</li>
          <li>memory: {result.memory}</li>
          <li>stderr: {result.stderr && b64_to_utf8(result.stderr)}</li>
          <li>message: {result.message && b64_to_utf8(result.message)}</li>
          <li>status: {result?.status?.description}</li>
          <li>error: {result?.error}</li>
          <li>
            compile_output:
            {result?.compile_output &&
              b64_to_utf8(result?.compile_output).toString('utf-8')}
          </li>
        </div>
      ) : null}
    </>
  );
};
