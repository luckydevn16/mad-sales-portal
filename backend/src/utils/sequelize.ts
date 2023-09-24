import { Op } from "sequelize";

export const parseLoadOptions = (loadOptions: any) => {
  const { filter, sort, skip, take } = loadOptions;

  // Parse filter options
  let where: any = {};
  if (filter) {
    where = parseWhereClauseByFilter(filter);
  }

  // Parse sort options
  const order: any[] = [];
  sort?.forEach((item: any) => {
    if (item.selector.includes(".")) {
      const arrSelector = item.selector.split(".");
      order.push([...arrSelector, item.desc ? "DESC" : "ASC"]);
    } else {
      order.push([item.selector, item.desc ? "DESC" : "ASC"]);
    }
  });

  // Parse offset & limit options
  const offset = parseInt(skip) || 0;
  const limit = parseInt(take) || 10;

  return {
    where,
    order,
    offset,
    limit,
  };
};

const hasNestedKey = (obj: any, key: string) => {
  const keys = key.split(".");

  for (const currentKey of keys) {
    if (!obj || !obj.hasOwnProperty(currentKey)) {
      return false;
    }
    obj = obj[currentKey];
  }

  return true;
};

const parseWhereClauseByFilter = (filter: any[]) => {
  let where: any = { this: {} };

  // multiple filtering
  if (typeof filter[0] === "object") {
    filter.forEach((item: any) => {
      if (typeof item === "object") {
        const [columnId, operator, value] = item;

        if (columnId.includes(".")) {
          const arrColumnId = columnId.split(".");
          let result = {};
          let currentObj: any = result;

          for (let i = 0; i < arrColumnId.length - 1; i++) {
            const key = arrColumnId[i];
            currentObj[key] = i < arrColumnId.length - 2 ? { this: {} } : {};
            currentObj = currentObj[key];
          }

          currentObj[arrColumnId[arrColumnId.length - 1]] = getOperator(
            operator,
            value
          );

          where = { ...where, ...result };
        } else {
          if (where.this[columnId]) {
            where.this[columnId] = {
              ...where.this[columnId],
              ...getOperator(operator, value),
            };
          } else {
            where.this[columnId] = getOperator(operator, value);
          }
        }
      }
    });
  } else {
    // single column filtering
    if (filter[0].includes(".")) {
      const arrFilter = filter[0].split(".");
      let result = {};
      let currentObj: any = result;

      for (let i = 0; i < arrFilter.length - 1; i++) {
        const key = arrFilter[i];
        currentObj[key] = i < arrFilter.length - 2 ? { this: {} } : {};
        currentObj = currentObj[key];
      }

      currentObj[arrFilter[arrFilter.length - 1]] = getOperator(
        filter[1],
        filter[2]
      );

      where = { ...where, ...result };
    } else {
      where.this[filter[0]] = getOperator(filter[1], filter[2]);
    }
  }

  return where;
};

const getOperator = (operator: string, value: string) => {
  if (operator === "contains") {
    return { [Op.iLike]: `%${value}%` };
  } else if (operator === "notcontains") {
    return { [Op.notILike]: `%${value}%` };
  } else if (operator === "startswith") {
    return { [Op.startsWith]: value };
  } else if (operator === "endswith") {
    return { [Op.startsWith]: value };
  } else if (operator === "=") {
    return { [Op.eq]: value };
  } else if (operator === "<>") {
    return { [Op.ne]: value };
  } else if (operator === "<") {
    return { [Op.lt]: value };
  } else if (operator === "<=") {
    return { [Op.lte]: value };
  } else if (operator === ">") {
    return { [Op.gt]: value };
  } else if (operator === ">=") {
    return { [Op.gte]: value };
  }
  return { [Op.substring]: value };
};
