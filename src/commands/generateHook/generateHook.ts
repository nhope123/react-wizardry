import { isWorkspaceConfigured, showInputBox, showQuickPick } from "../helpers/vscodeHelpers";

const generateHook = async () => {

  if (!isWorkspaceConfigured()) {
		return;
	}

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

export default generateHook;