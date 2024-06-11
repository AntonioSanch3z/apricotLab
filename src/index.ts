import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { DOMUtils } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { ButtonExtension } from './buttons';

const TOP_AREA_CSS_CLASS = 'apricot-TopArea';

// Notifications for deployed infrastructures (https://github.com/jupyterlab/extension-examples/tree/main/notifications)
// Signals to make widgets communicate with eachother (https://github.com/jupyterlab/extension-examples/tree/main/signals)
// state to save and restore data saved in persistent state database (https://github.com/jupyterlab/extension-examples/tree/main/state)

/**
 * Initialization data for the apricot extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'apricot:plugin',
  description: 'Advanced Platform for Reproducible Infrastructure in the Cloud via Open Tools.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension apricot is activated!');

    // Create the HTML content of the widget
    const node = document.createElement('div');
    node.className = 'apricot-TopArea';
    node.innerHTML = 'APRICOT <i class="icon"></i>';

    // Create the widget
    const widget = new Widget({ node });
    widget.id = DOMUtils.createDomID(); // Widgets must have an unique identifier
    widget.addClass(TOP_AREA_CSS_CLASS);

    // Add the widget to the top area of JupyterLab interface
    app.shell.add(widget, 'top', { rank: 1000 });


    let buttonExtension = new ButtonExtension();
    app.docRegistry.addWidgetExtension('Notebook', buttonExtension);

  }
};

export default plugin;
