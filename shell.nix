{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  # Define the packages needed for a Node.js development environment
  packages = with pkgs; [
    # Node.js and npm
    nodejs
    nodePackages.npm
    # Optional: Yarn for package management
    yarn
    # Optional: TypeScript for typed JavaScript development
    nodePackages.typescript
    # Basic build tools (useful for native Node.js modules)
    gcc
    gnumake
    pkg-config
    # Optional: Common utilities for Node.js development
    curl
    git
  ];

  # Environment setup for Node.js
  postShellHook = ''
    export PATH="$PATH:./node_modules/.bin"
    export NODE_PATH="$PWD/node_modules"
    echo ">> Node.js environment configured!"
    echo ">> Node.js version: $(node --version)"
    echo ">> npm version: $(npm --version)"
    ${pkgs.lib.optionalString (pkgs.yarn != null) ''
      echo ">> Yarn version: $(yarn --version)"
    ''}
    ${pkgs.lib.optionalString (pkgs.nodePackages.typescript != null) ''
      echo ">> TypeScript version: $(tsc --version)"
    ''}
  '';
}