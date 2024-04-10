export const GET_MAIN_PAGES = `
query ($pageSize: Int!, $after: String) {
  MainPage: search(
    where: {
      AND: [
        {
          name: "_path"
          value: "{A6826B19-704C-4F1B-A214-4D14326F1E55}"
          operator: CONTAINS
        }
        { name: "IsSearchable", value: "1", operator: EQ }
        # exclude
      ]
    }
    first: $pageSize
    after: $after
    orderBy: { name: "Title", direction: ASC }
  ) {
    total
    pageInfo {
      endCursor
      hasNext
    }
    results {
      ...itemDetail
    }
  }
}

fragment itemDetail on Item {
  parent {
    parent {
      id
      displayName
      url {
        path
      }
    }
  }
  id
  title: field(name: "Title") {
    ...textFields
  }
  content: field(name: "Content") {
    ...richTextFields
  }
}

fragment textFields on TextField {
  value
}

fragment richTextFields on RichTextField {
  value
}

`;

export const GET_SUCCESS_STORIES = `
fragment richTextFields on RichTextField {
  value
}

fragment itemDetail on Item {
  parent {
    parent {
      id
      displayName
      url {
        path
      }
    }
  }
  content: field(name: "Content") {
    ...richTextFields
  }
}

query ($pageSize: Int!, $after: String) {
  SuccessStory: search(
    where: {
      AND: [
        {
          name: "_templates"
          value: "{A12A73E1-90A5-4544-B021-8147724200F5}"
          operator: CONTAINS
        }
        {
          name: "_path"
          value: "{2ABE37B5-837B-4FC6-B8D0-0369E128CCD1}"
          operator: CONTAINS
        }
      ]
    }
    first: $pageSize
    after: $after
    orderBy: { name: "Title", direction: ASC }
  ) {
    total
    results {
      ...itemDetail
    }
  }
}
`;

export const GET_ARTICLES = `
fragment newsListing on Item {
  ... on NewsDetail {
    id
    title {
      value
    }
    content {
      value
    }
    displayDate {
      value
    }
  }
  url {
    path
  }
}

query getNewsListing($pageSize: Int!, $after: String) {
  pageOne: search(
    where: {
      AND: [
        {
          name: "_path"
          value: "{3B12C5B5-7882-4178-AD41-C1C13A796D54}"
          operator: CONTAINS
        }
        {
          name: "_templates"
          value: "{03C5C783-F4AB-4D3B-A170-B8308E079A50}"
          operator: EQ
        }
      ]
    }
    first: $pageSize
    after: $after
    orderBy: { name: "displayDate", direction: DESC }
  ) {
    total
    pageInfo {
      endCursor
      hasNext
    }
    results {
      ...newsListing
    }
  }
}
`;

export const GET_NEWS_CAROUSEL_ITEMS = `
  query($datasource: String!) {
    NewsCarousel: search(
      where: {
        AND: [
          {
            name: "_templates"
            value: "{03C5C783-F4AB-4D3B-A170-B8308E079A50}"
            operator: EQ
          }
          { name: "_path", value: $datasource, operator: EQ }
        ]
      }
      first: 10
      orderBy: { name: "DisplayDate", direction: DESC }
    ) {
      total
      results {
        url {
          path
        }
        Title: field(name: "Title") {
          value
        }
        FeaturedTag: field(name: "FeaturedTag") {
          ...lookupField
        }
        NewsTypeTag: field(name: "NewsTypeTag") {
          ...textField
        }
        CategoryTags: field(name: "CategoryTags") {
          ...multiListField
        }
        ShortContent: field(name: "ShortContent") {
          ...richTextField
        }
        Image: field(name: "Image") {
          ...imageField
        }
        DisplayDate: field(name: "DisplayDate") {
          jsonValue
        }
      }
    }
    ButtonText: item(
      path: "{D3EC7ABA-748F-47E4-9231-6B3812797605}"
      language: "en"
    ) {
      Phrase: field(name: "Phrase") {
        value
      }
    }
  }

  fragment lookupField on LookupField {
    value: targetItem {
      name
    }
  }

  fragment textField on TextField {
    value
  }

  fragment richTextField on RichTextField {
    value
  }

  fragment multiListField on MultilistField {
    value: targetItems {
      name
    }
  }
  fragment imageField on ImageField {
    src
  }
`;
