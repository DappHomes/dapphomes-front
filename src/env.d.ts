interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_PROJECT_ID: string
  readonly NG_APP_IPFS_BASE_URL: string
  readonly NG_APP_PINATA_PIN_LIST_TOKEN: string
  readonly NG_TACO_PROVIDER: string
}
