import { findDirectory, getComponentName, getCurrentWorkspaceFolders, showInputBox, showQuickPick } from "../helpers/vscodeHelpers";
import * as vscode from 'vscode';

const regex = /^use/i; 

const generateHook = async () => {

  const workspaceFolders = getCurrentWorkspaceFolders();
	if (!workspaceFolders) {
		return null;
	} 

  /*
    TODO: complete the hook folder location
  */
  // const hooksFolder = await findDirectory('hooks');

  // let destinationFolder: string;
  // if (!hooksFolder) {
  //   destinationFolder = await showQuickPick(
  //     ['src/hooks', 'src/components', 'src/utils'],
  //     'Select a destination folder for the new hook'
  //   );
  // } else {
  //   destinationFolder = hooksFolder;
  // }

  // get the name
 
  let hookName = await getComponentName(
    'Enter Hook Name. (eg. State)', 
    'Hook Name cannot be empty'
  );

  if (hookName) {
    if (regex.test(hookName)) {
      hookName = hookName.charAt(0).toLowerCase() + hookName.slice(1);
    } else {
      hookName = 'use' + hookName;
    }
  }

  

  const hasUseState = await showQuickPick(['Yes', 'No'], 'Should have useState?');


  const hasUseEffect = await showQuickPick(['Yes', 'No'], 'Should have useEffect?');

  // should have useState

  // should have useEffect

  // return 

  vscode.window.showInformationMessage(
		`Custom hook ${hookName} created successfully!`
	);

};

const hookTemplateUtils = ''

export default generateHook;