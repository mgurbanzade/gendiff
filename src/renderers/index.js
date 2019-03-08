import plain from './plainRenderer';
import graphical from './graphicalRenderer';

const rendererDispatcher = {
  plain,
  graphical,
};

export default (outputFormat = 'graphical') => {
  const renderer = rendererDispatcher[outputFormat];
  if (!renderer) throw new Error(`Unsupported output format: ${outputFormat}.`);
  return renderer;
};
