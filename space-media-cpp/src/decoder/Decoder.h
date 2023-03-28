#pragma once

namespace SpaceMedia 
{
  class Decoder 
  {
    public:
      virtual void decode() = 0;
      virtual void dispose() = 0;
  };
}