import plain from './plainRenderer';
import graphical from './graphicalRenderer';

const rendererDispatcher = {
  plain,
  graphical,
};

export default (outputFormat = 'graphical') => {
  const isValidFormat = Object.keys(rendererDispatcher).includes(outputFormat);
  if (!isValidFormat) throw new Error(`Unsupported output format: ${outputFormat}.`);
  return rendererDispatcher[outputFormat];
};
