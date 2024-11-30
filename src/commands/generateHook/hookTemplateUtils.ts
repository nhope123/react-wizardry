const createStateTemplate = (name:string) => `\tconst [${name}, set${name[0].toUpperCase() + name.slice(1) }] = useState<>();`;

const createUseEffectTemplate = (effectBody: string, dependencies: string[] = []) => 
  `\tuseEffect(() => {\n\t\t${effectBody}\n\t}, [${dependencies.join(', ')}]);`;

