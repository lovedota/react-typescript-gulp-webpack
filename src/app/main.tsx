import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Child from './components/child';

class Test extends React.Component<any, any> {
    render() {
        return (
            <div>
                Parent: ->
                <Child />
            </div>
        );
    }
}

ReactDOM.render(<Test />, document.getElementById('container'));