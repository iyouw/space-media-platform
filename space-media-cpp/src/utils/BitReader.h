#pragma once

#include <cstdint>
#include <vector>
#include <memory>

using namespace std;

namespace SpaceMedia 
{
  class BitReader
  {
    public:
      BitReader(shared_ptr<vector<shared_ptr<const uint8_t>>> data);
      size_t length() const { return byteLength() << 3; }
      size_t byteLength() const { return m_data->size(); }
      size_t index() const { return m_position >> 3; }
      void setIndex(size_t index) { m_position = (index << 3);}
      size_t nextIndex() const { return (m_position + 7) >> 3; }
      size_t position() const { return m_position;}
      size_t free() const { return byteLength() - index(); }
    
      void append(shared_ptr<vector<shared_ptr<const uint8_t>>> data);

    private:
      size_t m_position;
      unique_ptr<vector<shared_ptr<const uint8_t>>> m_data;
  };  
}