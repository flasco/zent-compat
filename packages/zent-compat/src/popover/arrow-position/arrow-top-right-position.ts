import { ArrowOffsetHorizontal } from 'zent/es/constants';

import { PositionFunctionImpl } from '../position-function';
import createPlacement from '../placement/create';
import createArrowPosition from './create';

const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const { right, left, top } = anchorBoundingBox;
  const middle = (left + right) / 2;
  const x = middle - (contentDimension.width - ArrowOffsetHorizontal);
  const y = top - contentDimension.height - options.cushion;

  return createArrowPosition(x, y, `top-right`);
};

const ArrowTopRightPosition = createPlacement(locate);

export default ArrowTopRightPosition;
