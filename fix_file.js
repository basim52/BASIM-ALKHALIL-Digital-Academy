import { execSync } from 'child_process';
try {
  console.log('Resetting AiCurriculum.tsx...');
  execSync('git checkout -- src/components/AiCurriculum.tsx');
  console.log('Reverted successfully!');
} catch (e) {
  console.error(e);
}
