import cdk = require('@aws-cdk/cdk');
import cb = require('@aws-cdk/aws-codebuild');

export class Codebld1Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new cb.Project(this, 'Learning-CDK-project', {
      environment: {buildImage: cb.LinuxBuildImage.UBUNTU_14_04_NODEJS_10_1_0}, //build environment with NodeJs
      source: new cb.GitHubSource({
        owner: 'ccfife', //github ID
        repo: 'learning-cdk', //github repo
        webhook: true, //rebuild everytime a code change is pushed to this repository
        oauthToken: cdk.SecretValue.secretsManager('ccfife_github') //read GitHub access key from Secrets Manager
      }),
      buildSpec: {
        version: '0.2',
        phases: {
          install: {
            commands: [
              'npm install', //install npm dependencies in package.json
            ],
          },
          build: {
            commands: [
              'npm run build',  //compile TypeScript to JavaScript
              'npm run cdk synth -- -o dist' //synthesize CDK app and put results in 'dist'
            ],
          },
        },
        artifacts: {
          'files': [ '**/*' ],
          'base-directory': 'dist'
        }
      }
    });
  }
}
