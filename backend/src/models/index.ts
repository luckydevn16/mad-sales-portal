"use strict";

import { Sequelize } from "sequelize";

import userModel from "./user.model";
import invitationModel from "./invitation.model";
import verification_codeModel from "./verification_code.model";
import login_logModel from "./login_log.model";
import stateModel from "./state.model";
import quote_fileModel from "./quote_file.model";
import quote_noteModel from "./quote_note.model";
import quoteModel from "./quote.model";
import userStateModel from "./userState.model";

const config = require("../config/database");

const sequelize: any = new Sequelize(
  config.database as string,
  config.username as string,
  config.password,
  config
);

const db: DB = {
  User: userModel(sequelize),
  VerificationCode: verification_codeModel(sequelize),
  Invitation: invitationModel(sequelize),
  LoginLog: login_logModel(sequelize),
  State: stateModel(sequelize),
  Quote: quoteModel(sequelize),
  QuoteNote: quote_noteModel(sequelize),
  QuoteFile: quote_fileModel(sequelize),
  UserState: userStateModel(sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
