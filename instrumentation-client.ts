import { initBotId } from "botid/client/core";

// Vérifie les envois du formulaire sans afficher de défi aux visiteurs.
// Le contrôle serveur correspondant se trouve dans app/api/contact/route.ts.
initBotId({
  protect: [
    {
      path: "/api/contact",
      method: "POST",
      advancedOptions: { checkLevel: "basic" },
    },
  ],
});
