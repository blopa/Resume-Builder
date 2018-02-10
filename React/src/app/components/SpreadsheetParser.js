import React from 'react';

export class SpreadsheetParser extends React.Component {
    parseUpload(event){
        console.log(event);
        window.alert('something 1');
    }
    parseURL(event){
        console.log(event);
        window.alert('something 2');
    }
    render() {
        return(
            <div id="data-input">
                <h4>Paste your Google Spreadsheet URL...</h4>
                <p>(<a href="https://docs.google.com/spreadsheets/d/1HFGm_cSH_XeZtxfREusftu-4S1LYZeAVSVjWMmsRHtY/copy" target="_blank">make a copy</a>)</p>
                <div className="input-container">
                    <div className="data-link-input">
                        {/*v-on:submit="validateURL()"*/}
                        <form onSubmit={this.parseURL}>
                            <input type="text" className="form-control" placeholder="Paste your Google Spreadsheet URL here." />
                        </form>
                    </div>
                    <h4>... or choose a file from your computer</h4>
                    <p>(<a href="https://docs.google.com/spreadsheets/d/1HFGm_cSH_XeZtxfREusftu-4S1LYZeAVSVjWMmsRHtY/export?format=xlsx&gid=0">download sample</a>)</p>
                    <div className="data-upload-input">
                        <label className="custom-file">
                            <input type="file" className="custom-file-input" onChange={this.parseUpload} />
                                <span className="custom-file-control">Choose file...</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

SpreadsheetParser.propTypes = {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
};