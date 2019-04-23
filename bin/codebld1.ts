#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { Codebld1Stack } from '../lib/codebld1-stack';

const app = new cdk.App();
new Codebld1Stack(app, 'Codebld1Stack');
