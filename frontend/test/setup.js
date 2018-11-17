import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM(
  '<!doctype html><html><body>' +
    '<div id="react-arrow-back"></div>' +
    '</body></html>'
);
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {}
    );
  Object.defineProperties(target, props);
}

global.window = window;
global.window.django_data = { urls: {} };
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.gettext = val => val;
global.pgettext = val => val;
copyProps(window, global);
