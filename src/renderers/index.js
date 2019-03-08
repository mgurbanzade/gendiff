import plain from './plainRenderer';
import graphical from './graphicalRenderer';
import json from './jsonRenderer';

const rendererDispatcher = {
  plain,
  graphical,
  json,
};

export default (outputFormat = 'graphical') => {
  const renderer = rendererDispatcher[outputFormat];
  if (!renderer) throw new Error(`Unsupported output format: ${outputFormat}.`);
  return renderer;
};
