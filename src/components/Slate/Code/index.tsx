import React, { useState } from 'react';
import Highlight, { Prism, Language } from 'prism-react-renderer';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LinesToHighlight, LinesNumberToHighlight } from 'react-mdx-prism-lighter';

const HighlightClassName = ' highlight-line'; //ハイライトの行に適用されるクラス名

interface CodeProps {
  codeString: string;
  language: Language;
  title: string;
}

export const CodeBlock = ({ codeString, language, title }: CodeProps) => {
  const [value, setValues] = useState<[string, boolean]>(['Copy', false]);

  const CopyText = () => {
    //copy all code
    setValues(['Copied', true]);
    setTimeout(() => {
      setValues(['Copy', false]);
    }, 5000);
  };

  return (
    <Highlight theme={nightOwl} Prism={Prism} code={codeString} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => {
        return (
          <div className='mb-8'>
            <div className='gatsby-title' data-slate-void='true'>
              {title && (
                <div className='py-3'>
                  <p className='text-gray-900 text-sm px-3 select-none'>{title}</p>
                </div>
              )}
            </div>

            <div className='relative' data-language={language}>
              <pre className='group  rounded-md' style={style}>
                <div className='px-0 pt-4 pb-4 overflow-auto'>
                  <CopyToClipboard
                    text={codeString.replace(
                      /\/\/(highlight\s|(highlight-start)|(highlight-end))/g,
                      '',
                    )}
                    onCopy={CopyText}
                  >
                    <button
                      className={`mx-4 focus:outline-none focus absolute top-2.5 right-0`}
                      disabled={value[1]}
                    >
                      <p className='rounded-lg text-xs text-white text-opacity-60 bg-coolgray-700 bg-opacity-70 py-1 px-2.5 transition-all group-hover:opacity-100 opacity-0'>
                        {value[0]}
                      </p>
                    </button>
                  </CopyToClipboard>
                  <div className='code_font text-sm sm:text-sm text-blue-900 tracking-normal px-6 float-left block min-w-full '>
                    {tokens.map((line, index) => {
                      const lineProps = getLineProps({ line, key: index });

                      // if (LinesToHighlight(line)) {
                      //   lineProps.className += HighlightClassName
                      // }
                      // if (LinesNumberToHighlight(highlight, index)) {
                      //   lineProps.className += HighlightClassName
                      // }

                      return (
                        <div {...lineProps} key={index}>
                          {line.map((token, key) => {
                            const tokenProps = getTokenProps({
                              token,
                              key: key,
                            });
                            return <span {...tokenProps} key={key} />;
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </pre>
            </div>
          </div>
        );
      }}
    </Highlight>
  );
};
