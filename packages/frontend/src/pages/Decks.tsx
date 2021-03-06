import * as React from "react";
import { Paper } from "@libresat/frontend-components";
import { Shell, IShellProps } from "@libresat/frontend-components";
import { decks } from "../data/decks";
import { navbar } from "../data/navbar";
import { footer } from "../data/footer";
import { noscript } from "../data/noscript";
import { shortcuts } from "../data/shortcuts";
import { Link } from "../downstream/Link";

const Decks = (props: any) => (
  <Shell
    head={decks.head}
    navbar={navbar as IShellProps["navbar"]}
    footer={footer as IShellProps["footer"]}
    noScript={noscript}
    shortcuts={shortcuts}
    background={decks.background}
    linkComponent={Link}
    {...props}
  >
    <Paper>
      <h1>Decks</h1>
      <i>Coming soon!</i>
    </Paper>
  </Shell>
);

export { Decks };
