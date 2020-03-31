import React, { Component } from 'react';
import { wrap, icon } from './index.css';
import { serviceCode } from 'widgetInstance';
import { dispatch } from 'widgetTool';

class Weather extends Component {
  componentDidMount() {
    window.WIDGET = {
      CONFIG: {
        "layout": 1,
        "width": "360",
        "height": "175",
        "background": 1,
        "dataColor": "F0E5E5",
        "modules": "10",
        "key": "cb196dc006c941b393df2e9417c984bb"
      }
    }
    var c = document.createElement('link')
    c.rel = 'stylesheet'
    c.href = 'https://widget.heweather.net/standard/static/css/he-standard.css?v=1.3'
    var s = document.createElement('script')
    s.src = 'https://widget.heweather.net/standard/static/js/he-standard.js?v=1.3'
    var sn = document.getElementsByTagName('script')[0]
    sn.parentNode.insertBefore(c, sn)
    sn.parentNode.insertBefore(s, sn)
  }
  render() {
    return (
      <div className={wrap}>
        <div id="he-plugin-standard"></div>
      </div>
    );
  }
}

export default Weather;