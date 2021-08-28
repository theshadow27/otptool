const fs = require("fs");
const totp = require("totp-generator");
const DEFAULT_OTPFILE = process.env.HOME + '/.2fa/otp.json';
const columnify = require('columnify')


function parseModel(argv){
   if(argv.__model) return argv.__model
   let m = loadModel(argv.otpfile);
   let m2 = m.filter(x=>x.originalName)
     .map(x=>({name: x.originalName.replace(/ /g, '').trim(),
               decryptedSeed: x.decryptedSeed,
               digits: x.digits,
               created: new Date(x.createdDate).toISOString() }));
   return argv.__model = m2;
}


// load config
function loadModel(cfg = DEFAULT_OTPFILE) {
  try {
    let contents = fs.readFileSync(cfg);
    return JSON.parse(contents);
  } catch (e) {
     console.warn(`could not load config ${cfg}:\n`, e); 
  }
  return [];
}

function _do_list(argv){
   let data = parseModel(argv).map( ({name, created}) => ({name, created}) );
   let columns = columnify(data);
   console.log(columns);
   ///parseModel(argv).forEach(x=>console.log("  " , x.name, "\t\t\t\t));
}

function _do_code(argv){
   const {name} = argv;
   const app = parseModel(argv).filter(x=>x.name.trim() === name.trim() )
     .map(x => totp(x.decryptedSeed, { digits: x.digits }) );
   switch(app.length){
      case 0:
         console.warn(`config '${name}' not found. Try one of:`);
         _do_list(argv);
         process.exit(-1);
         break;
      case 1:
         console.log(app[0]);
         process.exit(0);
         break;
      default:
         console.warn(`found more than one '${name}'!`);
         process.exit(-2); 
   }   
}

require('yargs')
  .scriptName("totp")
  .usage('$0 <cmd> [args]')
  .command('code [name]', 'generate an OTP code', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'default',
      describe: 'the name of the OTP config to use'
    })
  }, _do_code)
  .command('list', 'list the available applications', _do_list)
  .help()
  .argv

