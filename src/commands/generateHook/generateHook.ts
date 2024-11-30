import { findDirectory, getCurrentWorkspaceFolders, showInputBox, showQuickPick } from "../helpers/vscodeHelpers";
import * as vscode from 'vscode';

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
  const hookName = await showInputBox(
    'Enter Hook Name. (eg. State)', 
    'Hook Name cannot be empty'
  );

  let formattedHookName: string;

  if (hookName) {
    if (hookName.startsWith('use')) {
      formattedHookName = hookName.slice(0, 3) + hookName.charAt(3).toUpperCase() + hookName.slice(4);
    } else {
      formattedHookName = 'use' + hookName.charAt(0).toUpperCase() + hookName.slice(1);
    }
  }

  

  const hasUseState = await showQuickPick(['Yes', 'No'], 'Should have useState?');


  const hasUseEffect = await showQuickPick(['Yes', 'No'], 'Should have useEffect?');

  // should have useState

  // should have useEffect

  // return 

};

const hookTemplateUtils = ''

export default generateHook;