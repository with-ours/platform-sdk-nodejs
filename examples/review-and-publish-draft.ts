#!/usr/bin/env -S pnpm tsn -T
// Review pending config changes. Edits go to a draft and reach live traffic only on publish.
// By default this only reads the draft and prints what it would do; it publishes only when
// OURS_PRIVACY_EXAMPLE_PUBLISH=1. Draft experiments aren't in the diff and ship separately.
//
// Run from the repo root (OURS_PRIVACY_PLATFORM_BASE_URL optionally overrides the host):
//   OURS_PRIVACY_API_KEY=<api key> pnpm tsn -T examples/review-and-publish-draft.ts
import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const VERSION_NAME = 'Example release';

async function main() {
  if (!process.env['OURS_PRIVACY_API_KEY']) {
    throw new Error('Missing OURS_PRIVACY_API_KEY: set it to your platform API key.');
  }
  const client = new OursPrivacyPlatform();

  const diff = await client.versions.diff('draft');
  console.log(`draft changes: ${diff.count}`);
  console.log(JSON.stringify(diff.differences, null, 2));

  if (process.env['OURS_PRIVACY_EXAMPLE_PUBLISH'] !== '1') {
    console.log(`Dry run: would publish these changes as "${VERSION_NAME}". Nothing was changed.`);
    console.log('Set OURS_PRIVACY_EXAMPLE_PUBLISH=1 to publish this draft.');
    return;
  }

  // This changes the live configuration. It returns 409 if the draft has no changes.
  const version = await client.versions.create({ name: VERSION_NAME });
  console.log(`published version ${version.versionNumber} (${version.id})`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
